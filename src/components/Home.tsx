import { Redirect } from '@reach/router'
import React from 'react'

import { DefaultLayout } from './DefaultLayout'
import * as appState from '../state/app'
import { Timeline } from '../components/Timeline'
import { Spinner } from '../components/Spinner'
import { getAccessToken } from '../data/access-token'

import './Home.css'

export const Home = () => {
    const hasAccessToken = !!getAccessToken()
    const state = React.useContext(appState.context)

    if (!hasAccessToken) {
        return <Redirect noThrow={true} to="/login" />
    }

    return (
        <DefaultLayout titleText="Latest Videos">
            {!state.hasLoadedHomeContent ? <Spinner /> : <Timeline />}
        </DefaultLayout>
    )
}
