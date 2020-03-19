import React from 'react'
import { redirectTo } from '@reach/router'

import { getAccessTokenFromLocation } from '../data/access-token'
import './LoginForm.css'

export const LoginForm = () => {
    React.useEffect(() => {
        let accessToken = getAccessTokenFromLocation()

        if (accessToken) {
            window.localStorage.setItem('access_token', accessToken)
            window.location.href = '/home'
        }
    }, [])

    return (
        <div className="LoginForm">
            <form method="GET" action={'https://id.twitch.tv/oauth2/authorize'}>
                <input
                    type="hidden"
                    name="client_id"
                    value={process.env.REACT_APP_TWITCH_CLIENT_ID}
                />
                <input
                    type="hidden"
                    name="redirect_uri"
                    value={`${window.location.protocol}//${window.location.host}/login`}
                />
                <input type="hidden" name="response_type" value="token" />
                <input
                    type="submit"
                    value="Log In with Twitch"
                    className="LoginForm-button"
                />
            </form>
        </div>
    )
}
