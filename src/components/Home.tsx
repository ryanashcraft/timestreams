import React from 'react'

import { getUserFollows } from '../data/get-user-follows'
import { getUserId } from '../data/get-user-id'
import { getStream } from '../data/get-stream'
import { getVideos } from '../data/get-videos'
import * as appState from '../state/app'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Timeline } from '../components/Timeline'
import { Spinner } from '../components/Spinner'
import { getUser } from '../data/get-user'

import './Home.css'

export const Home = () => {
    const [state, dispatch] = React.useReducer(
        appState.reducer,
        appState.initialState
    )

    React.useEffect(() => {
        getUserId().then(userId => {
            getUserFollows(userId)
                .then(follows => {
                    Promise.all(
                        follows.map(follow => getUser(follow.to_id))
                    ).then(follows => {
                        dispatch({
                            type: 'SET_FOLLOWS',
                            follows,
                        })

                        Promise.all([
                            ...follows.map(follow => {
                                return getStream(follow.id).then(stream => {
                                    dispatch({
                                        type: 'SET_STREAM',
                                        userId: follow.id,
                                        stream,
                                    })
                                })
                            }),
                            ...follows.map(follow => {
                                return getVideos(follow.id).then(videos => {
                                    dispatch({
                                        type: 'SET_VIDEOS',
                                        userId: follow.id,
                                        videos,
                                    })
                                })
                            }),
                        ]).then(() => {
                            dispatch({ type: 'READY' })
                        })
                    })
                })
                .catch(error => {
                    alert('Something went wrong. Please try again.')
                })
        })
    }, [])

    return (
        <appState.context.Provider value={state}>
            <div className="Home">
                <Header />
                <div className="Home-timeline">
                    <div className="Home-header">Latest VODs</div>
                    {!state.isReady ? <Spinner /> : <Timeline />}
                </div>
                <Sidebar />
            </div>
        </appState.context.Provider>
    )
}
