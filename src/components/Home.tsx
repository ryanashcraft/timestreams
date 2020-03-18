import React, { useReducer } from 'react'

import { getUserFollows } from '../data/get-user-follows'
import { getUserId } from '../data/get-user-id'
import { getStream } from '../data/get-stream'
import * as appState from '../state/app'
import { Sidebar } from '../components/Sidebar'
import { Spinner } from '../components/Spinner'
import { getUser } from '../data/get-user'
import { StreamCard } from './StreamCard'

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

                        Promise.all(
                            follows.map(follow => {
                                return getStream(follow.id).then(stream => {
                                    dispatch({
                                        type: 'SET_STREAM',
                                        userId: follow.id,
                                        stream,
                                    })
                                })
                            })
                        ).then(() => {
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
            {state.isReady ? (
                <>
                    <Sidebar />
                    <div className="Home">
                        <div className="Home-grid">
                            {appState
                                .getActiveFollowedStreamers(state)
                                .map(user => {
                                    const stream =
                                        state.streamsByUserId[user.id]

                                    return (
                                        <StreamCard
                                            key={user.id}
                                            stream={stream}
                                        />
                                    )
                                })}
                        </div>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </appState.context.Provider>
    )
}
