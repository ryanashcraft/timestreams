import { twitchFetch } from './twitch-fetch'
import { Game } from '../types'

export const getTopGames = (): Promise<Game[]> => {
    return twitchFetch('/helix/games/top').then(data => {
        return data
    })
}
