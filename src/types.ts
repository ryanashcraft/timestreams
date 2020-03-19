import { string } from 'prop-types'

export type Follow = {
    from_id: string
    from_name: string
    to_id: string
    to_name: string
    followed_at: string
}

export type Stream = {
    game_id: string
    id: string
    language: string
    pagination: string
    started_at: string
    tag_ids: string[]
    thumbnail_url: string
    title: string
    type: string
    user_id: string
    user_name: string
    viewer_count: number
}

export type User = {
    broadcaster_type: string
    description: string
    display_name: string
    email: string
    id: string
    login: string
    offline_image_url: string
    profile_image_url: string
    type: string
    view_count: number
}

export type Video = {
    created_at: string
    description: string
    duration: string
    id: string
    language: string
    pagination: string
    published_at: string
    thumbnail_url: string
    title: string
    type: string
    url: string
    user_id: string
    user_name: string
    view_count: number
    viewable: string
}
export type Game = {
    box_art_url: string
    id: string
    name: string
}
