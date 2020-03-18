import React from 'react'

import { Stream } from '../types'

import './StreamCard.css'
import { formatCompact } from '../loc'

type Props = {
    stream: Stream
}

export const StreamCard = (props: Props) => {
    return (
        <a
            href={`https://twitch.tv/${props.stream.user_name}`}
            className="StreamCard"
        >
            <div className="StreamCard-thumbnailcontainer">
                <img
                    className="StreamCard-thumbnail"
                    src={props.stream.thumbnail_url
                        .replace('{width}', `${320 * 2}`)
                        .replace('{height}', `${180 * 2}`)}
                    alt=""
                />
                <div className="StreamCard-viewercount">
                    {formatCompact(props.stream.viewer_count)} Viewers
                </div>
            </div>

            <div className="StreamCard-info">
                <div className="StreamCard-title">{props.stream.title}</div>
                <div className="StreamCard-streamer">
                    {props.stream.user_name}
                </div>
            </div>
        </a>
    )
}
