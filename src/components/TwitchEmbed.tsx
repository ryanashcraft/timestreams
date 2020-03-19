import React from 'react'

import './TwitchEmbed.css'

type Props = {
    channel: string
    onBackgroundClick: VoidFunction
    videoId?: string
}

declare global {
    interface Window {
        Twitch: any
    }
}

export const TwitchEmbed = (props: Props) => {
    let embedRef = React.useRef(null)
    let root = document.querySelector('#root')
    let width = root ? root.getBoundingClientRect().width : 0
    let height = root ? root.getBoundingClientRect().height : 0

    React.useEffect(() => {
        if (typeof window.Twitch !== 'undefined') {
            new window.Twitch.Embed(embedRef.current, {
                width: width - 128,
                height: height - 128,
                channel: props.channel,
                video: props.videoId,
            })
        }
    }, [props.channel, height, width, props.videoId])

    return (
        <div className="TwitchEmbed" onClick={props.onBackgroundClick}>
            <div ref={embedRef}></div>
        </div>
    )
}
