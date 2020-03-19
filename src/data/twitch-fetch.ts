import { getAccessToken } from './access-token'

export const twitchFetch = (path: string): Promise<any> => {
    return fetch(`https://api.twitch.tv${path}`, {
        headers: {
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID || '',
            Authorization: `Bearer ${getAccessToken()}`,
        },
    })
        .then(res => {
            if (res.status !== 200) {
                throw new Error()
            }

            return res.json()
        })
        .then(res => res.data)
}
