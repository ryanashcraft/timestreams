import React from 'react'

import { formatCompact } from '../loc'
import * as appState from '../state/app'

import './Sidebar.css'

export const Sidebar = () => {
    const state = React.useContext(appState.context)
    const users = appState.getActiveFollowedStreamers(state)

    return (
        <div className="Sidebar">
            <div className="Sidebar-title">Followed Channels</div>
            <div className="Sidebar-list">
                {users.map(user => {
                    const stream = state.streamsByUserId[user.id]

                    return (
                        <a
                            key={user.id}
                            className="Sidebar-listitem"
                            href={`https://twitch.tv/${stream.user_name}`}
                        >
                            <img
                                className="Sidebar-profileimage"
                                src={user.profile_image_url}
                                width={30}
                                height={30}
                            />
                            <div className="Sidebar-streamertext">
                                <div className="Sidebar-streamername">
                                    {user.display_name}
                                </div>
                                <div className="Sidebar-streamtitle">
                                    {stream.title}
                                </div>
                            </div>
                            <div className="Sidebar-viewercount">
                                {formatCompact(stream.viewer_count)}
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
