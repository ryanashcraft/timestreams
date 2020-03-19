import React from 'react'

import { formatCompact } from '../loc'
import * as appState from '../state/app'
import { Spinner } from './Spinner'

import './Sidebar.css'

export const Sidebar = () => {
    const state = React.useContext(appState.context)
    const users = appState.getActiveFollowedStreamers(state)

    return (
        <div className="Sidebar">
            <div className="Sidebar-list">
                {!state.isReady ? (
                    <div className="Sidebar-section">
                        <Spinner />
                    </div>
                ) : (
                    <div className="Sidebar-section">
                        <div className="Sidebar-title">Followed Channels</div>
                        {users.slice(0, 5).map(user => {
                            const stream = state.streamsByUserId[user.id]

                            return (
                                <a
                                    key={user.id}
                                    className="Sidebar-listitem"
                                    href={`https://twitch.tv/${user.login}`}
                                >
                                    <img
                                        className="Sidebar-profileimage"
                                        src={user.profile_image_url}
                                        alt=""
                                        width={30}
                                        height={30}
                                    />
                                    <div className="Sidebar-streamertext">
                                        <div className="Sidebar-streamername">
                                            {user.display_name}
                                        </div>
                                        {!!stream && (
                                            <div className="Sidebar-streamtitle">
                                                {stream.title}
                                            </div>
                                        )}
                                    </div>
                                    {!!stream && (
                                        <div className="Sidebar-viewercount">
                                            {formatCompact(stream.viewer_count)}
                                        </div>
                                    )}
                                </a>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
