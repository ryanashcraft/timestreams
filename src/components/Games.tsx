import React from 'react'

import { DefaultLayout } from './DefaultLayout'
import * as appState from '../state/app'
import { TopGames } from '../components/TopGames'
import { Spinner } from '../components/Spinner'

export const Games = () => {
    const state = React.useContext(appState.context)

    return (
        <DefaultLayout titleText="Top Games">
            {!state.hasLoadedGamesContent ? <Spinner /> : <TopGames />}
        </DefaultLayout>
    )
}
