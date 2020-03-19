import React from 'react'

import * as appState from '../state/app'
import { TimelineRow } from './TimelineRow'
import './Timeline.css'

export const Timeline = () => {
    const state = React.useContext(appState.context)
    const videos = appState.getSortedVideos(state)

    return (
        <div>
            {videos.map(video => {
                let user = state.follows.find(
                    follow => follow.id === video.user_id
                )

                if (user) {
                    return <TimelineRow user={user} video={video} />
                } else {
                    return null
                }
            })}
        </div>
    )
}
