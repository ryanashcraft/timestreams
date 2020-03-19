import React from 'react'

import { Stream, User, Video } from '../types'
import { subDays } from 'date-fns'

export type State = {
    follows: User[]
    streamsByUserId: {
        [id: string]: Stream
    }
    videosByUserId: {
        [id: string]: Video[]
    }
    isReady: boolean
}

type SetFollowsAction = {
    type: 'SET_FOLLOWS'
    follows: User[]
}

type SetStreamAction = {
    type: 'SET_STREAM'
    userId: string
    stream: Stream
}

type SetVideosAction = {
    type: 'SET_VIDEOS'
    userId: string
    videos: Video[]
}

type ReadyAction = {
    type: 'READY'
}

type Action = SetFollowsAction | SetStreamAction | SetVideosAction | ReadyAction

export const initialState = {
    follows: [],
    streamsByUserId: {},
    videosByUserId: {},
    isReady: false,
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_FOLLOWS':
            return {
                ...state,
                follows: action.follows,
            }
        case 'SET_STREAM':
            return {
                ...state,
                streamsByUserId: {
                    ...state.streamsByUserId,
                    [action.userId]: action.stream,
                },
            }
        case 'SET_VIDEOS':
            return {
                ...state,
                videosByUserId: {
                    ...state.videosByUserId,
                    [action.userId]: action.videos,
                },
            }
        case 'READY':
            return {
                ...state,
                isReady: true,
            }
        default:
            return state
    }
}

export const context = React.createContext<State>(initialState)

export const getFollowedStreamers = (state: State): User[] => {
    return state.follows.sort((a, b) => {
        const aStream = state.streamsByUserId[a.id]
        const bStream = state.streamsByUserId[b.id]

        return (
            (bStream ? bStream.viewer_count : 0) -
            (aStream ? aStream.viewer_count : 0)
        )
    })
}

export const getSortedVideos = (state: State): Video[] => {
    let videos: Video[] = []

    for (let follow of state.follows) {
        const stream = state.streamsByUserId[follow.id]
        let followVideos = state.videosByUserId[follow.id]

        if (stream) {
            followVideos = followVideos.filter(video => {
                return (
                    Date.parse(video.published_at) <
                    Date.parse(stream.started_at)
                )
            })
        }

        videos = videos.concat(followVideos)
    }

    videos.sort((a, b) => {
        return Date.parse(b.published_at) - Date.parse(a.published_at)
    })

    videos = videos.filter(video => {
        return (
            new Date(video.published_at).getTime() >
            subDays(new Date(), 7).getTime()
        )
    })

    return videos
}
