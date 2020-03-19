import { twitchFetch } from './twitch-fetch'
import { Video } from '../types'

export const getVideos = (userId: string): Promise<Video[]> => {
    return twitchFetch(`/helix/videos?user_id=${userId}&first=5`).then(data => {
        return data
    })
}
