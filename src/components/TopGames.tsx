import React from 'react'

import * as appState from '../state/app'
import { Game } from '../types'

import './TopGames.css'

export const TopGames = () => {
    const state = React.useContext(appState.context)

    return (
        <div>
            {state.topGames.map(game => {
                return <Row key={game.id} game={game} />
            })}
        </div>
    )
}

type RowProps = {
    game: Game
}

const Row = (props: RowProps) => {
    return (
        <a
            className="TopGames-row"
            href={`https://twitch.tv/directory/game/${encodeURIComponent(
                props.game.name
            )}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src={props.game.box_art_url
                    .replace('{width}', `${122}`)
                    .replace('{height}', `${162}`)}
                width={122 / 2}
                height={162 / 2}
                className="TopGames-boxart"
            />
            <div className="TopGames-gamename">{props.game.name}</div>
        </a>
    )
}
