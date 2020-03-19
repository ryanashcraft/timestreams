import React from 'react'
import cx from 'classnames'
import { Link } from '@reach/router'

import { ReactComponent as HomeIcon } from '@fortawesome/fontawesome-free/svgs/solid/home.svg'
import { ReactComponent as GamePad } from '@fortawesome/fontawesome-free/svgs/solid/gamepad.svg'

import './Header.css'

let links = [
    {
        href: '/home',
        labelText: 'Home',
        iconClass: HomeIcon,
    },
    {
        href: '/games',
        labelText: 'Games',
        iconClass: GamePad,
    },
]

export const Header = () => {
    return (
        <header className="Header">
            <div className="Header-list">
                {links.map((link, i) => {
                    return (
                        <Link
                            key={i}
                            getProps={({ isPartiallyCurrent }) => ({
                                className: cx(
                                    'Header-listitem',
                                    isPartiallyCurrent && 'Header-linkactive'
                                ),
                            })}
                            to={link.href}
                        >
                            <div className="Header-listitemcontents">
                                <link.iconClass
                                    className="Header-listitemicon"
                                    width={26}
                                />
                                {link.labelText}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </header>
    )
}
