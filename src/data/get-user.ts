import { twitchFetch } from './twitch-fetch'
import { User } from '../types'

export const getUser = (userID: string): Promise<User> => {
    return twitchFetch(`/helix/users?id=${userID}`).then(data => {
        return data[0]
    })
}
