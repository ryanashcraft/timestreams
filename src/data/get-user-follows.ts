import { twitchFetch } from './twitch-fetch'
import { Follow } from '../types'

export const getUserFollows = (userID: string): Promise<Follow[]> => {
    return twitchFetch(`/helix/users/follows?from_id=${userID}`).then(data => {
        return data
    })
}
