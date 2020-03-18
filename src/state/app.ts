import React from 'react'

import { Follow, Stream, User } from '../types'

export type State = {
    follows: User[]
    streamsByUserId: {
        [id: string]: Stream
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

type ReadyAction = {
    type: 'READY'
}

type Action = SetFollowsAction | SetStreamAction | ReadyAction

export const initialState = {
    follows: [],
    streamsByUserId: {},
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

export const getActiveFollowedStreamers = (state: State): User[] => {
    return state.follows
        .filter(user => Boolean(state.streamsByUserId[user.id]))
        .sort((a, b) => {
            const aStream = state.streamsByUserId[a.id]
            const bStream = state.streamsByUserId[b.id]

            return bStream.viewer_count - aStream.viewer_count
        })
}
