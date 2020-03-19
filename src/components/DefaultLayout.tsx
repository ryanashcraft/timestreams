import React from 'react'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import './DefaultLayout.css'

type Props = {
    children: React.ReactNode
    titleText: string
}

export const DefaultLayout = (props: Props) => {
    return (
        <div className="DefaultLayout">
            <Header />
            <div className="DefaultLayout-timeline">
                <div className="DefaultLayout-title">
                    <div className="DefaultLayout-titlecontents">
                        {props.titleText}
                    </div>
                </div>
                {props.children}
            </div>
            <Sidebar />
        </div>
    )
}
