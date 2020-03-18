import React from 'react'

import './LoginForm.css'

export const LoginForm = () => {
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
                    value="http://localhost:3001"
                />
                <input type="hidden" name="response_type" value="token" />
                <input
                    type="submit"
                    value="Log In"
                    className="LoginForm-button"
                />
            </form>
        </div>
    )
}
