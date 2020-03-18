import { twitchFetch } from './twitch-fetch'

export const getUserId = (login: string | null = null): Promise<string> => {
    if (login) {
        return twitchFetch(`/helix/users?login=${login}`).then(data => {
            return data[0].id
        })
    } else {
        return twitchFetch(`/helix/users`).then(data => {
            return data[0].id
        })
    }
}
