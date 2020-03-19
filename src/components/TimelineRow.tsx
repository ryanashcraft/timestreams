import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import { TwitchEmbed } from './TwitchEmbed'
import { Modal } from './Modal'
import { User, Video } from '../types'
import { formatCompact } from '../loc'
import './TimelineRow.css'

type Props = {
    user: User
    video: Video
}

export const TimelineRow = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    return (
        <div onClick={() => setIsModalOpen(true)} className="TimelineRow">
            <Modal
                isOpen={isModalOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={e => {
                    e.stopPropagation()
                    setIsModalOpen(false)
                }}
            >
                <TwitchEmbed
                    channel={props.user.login}
                    onBackgroundClick={() => setIsModalOpen(false)}
                />
            </Modal>
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
        </div>
    )
}
