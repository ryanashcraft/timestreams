import { twitchFetch } from './twitch-fetch'
import { Stream } from '../types'

export const getStream = (userID: string): Promise<Stream> => {
    return twitchFetch(`/helix/streams?user_id=${userID}`).then(data => {
        return data[0]
    })
}
