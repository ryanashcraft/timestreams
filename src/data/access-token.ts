export const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token')
}

export const getAccessTokenFromLocation = (): string | null => {
    let pair = window.location.hash
        .slice(1)
        .split('&')
        .map(pairString => pairString.split('='))
        .find(pair => pair[0] === 'access_token')

    return pair ? pair[1] : null
}
