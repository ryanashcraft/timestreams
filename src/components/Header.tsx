import React from 'react'

import './Header.css'

let links = [
    {
        href: '#',
        labelText: 'Home',
    },
]

export const Header = () => {
    return (
        <header className="Header">
            <div className="Header-list">
                {links.map(link => {
                    return (
                        <a
                            key={link.href}
                            className="Header-listitem Header-link"
                            href={link.href}
                        >
                            <span className="Header-listitemcontents">
                                {link.labelText}
                            </span>
                        </a>
                    )
                })}
            </div>
        </header>
    )
}
