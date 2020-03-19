import React from 'react'
import { Router, Redirect, RouteComponentProps } from '@reach/router'

import { getUserFollows } from './data/get-user-follows'
import { getUserId } from './data/get-user-id'
import { getStream } from './data/get-stream'
import { getVideos } from './data/get-videos'
import { getTopGames } from './data/get-top-games'
import { getUser } from './data/get-user'
import * as appState from './state/app'
import { Home } from './components/Home'
import { Games } from './components/Games'
import { LoginForm } from './components/LoginForm'
import { getAccessToken } from './data/access-token'
import './App.css'

const RouterPage = (props: { component: JSX.Element } & RouteComponentProps) =>
    props.component

const App = () => {
    const hasAccessToken = !!getAccessToken()
    const [state, dispatch] = React.useReducer(
        appState.reducer,
        appState.initialState
    )

    React.useEffect(() => {
        if (!hasAccessToken) {
            return
        }

        getTopGames()
            .then(games => {
                dispatch({
                    type: 'SET_TOP_GAMES',
                    games,
                })

                dispatch({ type: 'GAMES_READY' })
            })
            .catch(error => {
                alert('Something went wrong. Please try again.')
            })

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
                            dispatch({ type: 'HOME_READY' })
                        })
                    })
                })
                .catch(error => {
                    alert('Something went wrong. Please try again.')
                })
        })
    }, [hasAccessToken])

    return (
        <appState.context.Provider value={state}>
            <Router className="App">
                <Redirect
                    from="/"
                    noThrow={true}
                    to={hasAccessToken ? 'home' : 'login'}
                />
                <RouterPage component={<Home />} path="home" />
                <RouterPage component={<Games />} path="games" />
                <RouterPage component={<LoginForm />} path="login" />
            </Router>
        </appState.context.Provider>
    )
}

export default App
