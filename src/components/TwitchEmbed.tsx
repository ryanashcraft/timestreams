import React from 'react'

import './TwitchEmbed.css'

type Props = {
    channel: string
    onBackgroundClick: VoidFunction
}

declare global {
    interface Window {
        Twitch: any
    }
}

export const TwitchEmbed = (props: Props) => {
    let embedRef = React.useRef(null)
    let root = document.querySelector('#root')
    let height = root ? root.getBoundingClientRect().height : 0

    React.useEffect(() => {
        if (typeof window.Twitch !== 'undefined') {
            new window.Twitch.Embed(embedRef.current, {
                width: 861,
                height: 484,
                channel: props.channel,
                layout: 'video',
            })
        }
    }, [props.channel])

    return (
        <div className="TwitchEmbed" onClick={props.onBackgroundClick}>
            <div ref={embedRef}></div>
            <div className="TwitchEmbed-Chat">
                <iframe
                    frameBorder="0"
                    scrolling="no"
                    src="https://www.twitch.tv/embed/linkus7/chat"
                    height={height}
                    width="350"
                />
            </div>
        </div>
    )
}
