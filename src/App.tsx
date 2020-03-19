import React from 'react'
import { Router, Redirect, RouteComponentProps } from '@reach/router'

import './App.css'

import { Home } from './components/Home'
import { LoginForm } from './components/LoginForm'
import { getAccessToken } from './data/access-token'

const RouterPage = (props: { component: JSX.Element } & RouteComponentProps) =>
    props.component

const App = () => {
    const hasAccessToken = !!getAccessToken()

    return (
        <Router className="App">
            <Redirect
                from="/"
                noThrow={true}
                to={hasAccessToken ? 'home' : 'login'}
            />
            <RouterPage component={<Home />} path="home" />
            <RouterPage component={<LoginForm />} path="login" />
        </Router>
    )
}

export default App
