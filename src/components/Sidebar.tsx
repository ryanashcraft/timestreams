import React from 'react'
import { Sticky } from 'react-sticky'

import { TwitchEmbed } from './TwitchEmbed'
import { Modal } from './Modal'
import { formatCompact } from '../loc'
import * as appState from '../state/app'
import { Spinner } from './Spinner'
import { User, Stream } from '../types'

import './Sidebar.css'

export const Sidebar = () => {
    const state = React.useContext(appState.context)
    const users = appState.getFollowedStreamers(state)

    return (
        <div className="Sidebar">
            <Sticky>
                {({ style }) => (
                    <div className="Sidebar-list" style={style}>
                        {!state.hasLoadedHomeContent ? (
                            <div className="Sidebar-section">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="Sidebar-section">
                                <div className="Sidebar-title">
                                    Followed Channels
                                </div>
                                {users.slice(0, 5).map(user => {
                                    const stream =
                                        state.streamsByUserId[user.id]

                                    return (
                                        <ChannelRow
                                            key={user.id}
                                            user={user}
                                            stream={stream}
                                        />
                                    )
                                })}
                            </div>
                        )}
                        <div className="Sidebar-meta">
                            Made by{' '}
                            <a href="https://ryanashcraft.me">Ryan Ashcraft</a>
                        </div>
                    </div>
                )}
            </Sticky>
        </div>
    )
}

type ChannelRowProps = {
    user: User
    stream: Stream | null
}

const ChannelRow = (props: ChannelRowProps) => {
    const { user, stream } = props
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    return (
        <div
            key={user.id}
            className="Sidebar-listitem"
            onClick={() => setIsModalOpen(true)}
        >
            <Modal
                isOpen={isModalOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={e => {
                    e.stopPropagation()
                    setIsModalOpen(false)
                }}
            >
                <TwitchEmbed
                    channel={user.login}
                    onBackgroundClick={() => setIsModalOpen(false)}
                />
            </Modal>
            <img
                className="Sidebar-profileimage"
                src={user.profile_image_url}
                alt=""
                width={30}
                height={30}
            />
            <div className="Sidebar-streamertext">
                <div className="Sidebar-streamername">{user.display_name}</div>
                {!!stream && (
                    <div className="Sidebar-streamtitle">{stream.title}</div>
                )}
            </div>
            {!!stream && (
                <div className="Sidebar-viewercount">
                    {formatCompact(stream.viewer_count)}
                </div>
            )}
        </div>
    )
}
