import React from 'react'

import './Spinner.css'

export const Spinner = () => {
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        let intervalId = setInterval(() => {
            setCounter(counter => counter + 1)
        }, 200)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div className="Spinner">
            {Array.from({ length: 3 }, (_, i) => i).map(i => {
                return (
                    <div
                        key={i}
                        className="Spinner-dot"
                        style={{ opacity: counter % 3 == i ? 1 : 0.5 }}
                    ></div>
                )
            })}
        </div>
    )
}
