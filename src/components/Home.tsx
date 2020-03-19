import React from 'react'

import { DefaultLayout } from './DefaultLayout'
import * as appState from '../state/app'
import { Timeline } from '../components/Timeline'
import { Spinner } from '../components/Spinner'

import './Home.css'

export const Home = () => {
    const state = React.useContext(appState.context)

    return (
        <DefaultLayout titleText="Latest Videos">
            {!state.hasLoadedHomeContent ? <Spinner /> : <Timeline />}
        </DefaultLayout>
    )
}
