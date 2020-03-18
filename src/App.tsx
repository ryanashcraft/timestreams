import React from 'react'

import './App.css'

import { Home } from './components/Home'
import { LoginForm } from './components/LoginForm'

function App() {
    const hasAccessToken = window.location.hash.includes('access_token')

    return (
        <div className="App">{hasAccessToken ? <Home /> : <LoginForm />}</div>
    )
}

export default App
