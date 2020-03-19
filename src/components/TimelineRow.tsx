import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import { User, Video } from '../types'

import './TimelineRow.css'
import { formatCompact } from '../loc'

type Props = {
    user: User
    video: Video
}

export const TimelineRow = (props: Props) => {
    return (
        <a href={props.video.url} className="TimelineRow">
            <img
                className="TimelineRow-profileimage"
                src={props.user.profile_image_url}
                alt=""
                width={50}
                height={50}
            />
            <div>
                <div className="TimelineRow-firstrow">
                    <span className="TimelineRow-streamer">
                        {props.video.user_name}
                    </span>{' '}
                    ·{' '}
                    {formatDistanceToNow(new Date(props.video.published_at), {
                        addSuffix: true,
                    })}
                </div>
                <div className="TimelineRow-title">{props.video.title}</div>
                {!!props.video.thumbnail_url && (
                    <img
                        className="TimelineRow-card"
                        src={props.video.thumbnail_url
                            .replace('%{width}', `${520 * 2}`)
                            .replace('%{height}', `${292 * 2}`)}
                        alt=""
                    />
                )}
                <div className="TimelineRow-viewercount">
                    {formatCompact(props.video.view_count)} Views
                </div>
            </div>
        </a>
    )
}
