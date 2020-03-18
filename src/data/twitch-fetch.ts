const getAccessToken = (): string | null => {
    let pair = window.location.hash
        .slice(1)
        .split('&')
        .map(pairString => pairString.split('='))
        .find(pair => pair[0] === 'access_token')

    return pair ? pair[1] : null
}

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
