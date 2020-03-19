import React from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import './DefaultLayout.css'

type Props = {
    children: React.ReactNode
    titleText: string
}

export const DefaultLayout = (props: Props) => {
    return (
        <StickyContainer className="DefaultLayout">
            <Header />
            <div className="DefaultLayout-timeline">
                <Sticky>
                    {({ style }) => (
                        <div className="DefaultLayout-title" style={style}>
                            <div className="DefaultLayout-titlecontents">
                                {props.titleText}
                            </div>
                        </div>
                    )}
                </Sticky>
                {props.children}
            </div>
            <Sidebar />
        </StickyContainer>
    )
}
