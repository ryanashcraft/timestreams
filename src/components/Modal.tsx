import React from 'react'
import ReactModal from 'react-modal'
import { ReactComponent as TimesIcon } from '@fortawesome/fontawesome-free/svgs/solid/times.svg'

import './Modal.css'

ReactModal.setAppElement('#root')

const customStyles = {
    content: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: 0,
        border: 0,
        padding: 0,
        background: 'transparent',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
    },
}

export const Modal = (
    props: ReactModal.Props & { children: React.ReactNode }
) => {
    return (
        <ReactModal {...props} style={customStyles}>
            <button className="Modal-button" onClick={props.onRequestClose}>
                <TimesIcon width={12} />
            </button>
            {props.children}
        </ReactModal>
    )
}
