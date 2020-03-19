import React from 'react'
import cx from 'classnames'
import { Sticky } from 'react-sticky'

import { ReactComponent as HomeIcon } from '@fortawesome/fontawesome-free/svgs/solid/home.svg'
import { ReactComponent as GamePad } from '@fortawesome/fontawesome-free/svgs/solid/gamepad.svg'

import './Header.css'

let links = [
    {
        href: '#',
        labelText: 'Home',
        iconClass: HomeIcon,
        isActive: true,
    },
    {
        href: '#',
        labelText: 'Games',
        iconClass: GamePad,
    },
]

export const Header = () => {
    return (
        <header className="Header">
            <Sticky>
                {({ style }) => (
                    <div className="Header-list" style={style}>
                        {links.map(link => {
                            return (
                                <a
                                    key={link.href}
                                    className={cx(
                                        'Header-listitem',
                                        link.isActive && 'Header-linkactive'
                                    )}
                                    href={link.href}
                                >
                                    <div className="Header-listitemcontents">
                                        <link.iconClass
                                            className="Header-listitemicon"
                                            width={26}
                                        />
                                        {link.labelText}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                )}
            </Sticky>
        </header>
    )
}
