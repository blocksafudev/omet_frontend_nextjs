import React, { useEffect, useState } from "react";

export const CAlert = ({ message, children, type = 'info', onClose }) => {
    const [bgColor, setBgColor] = useState('blue')


    useEffect(() => {
        switch (type) {
            case 'info':
                setBgColor('blue')
                break
            case 'success':
                setBgColor('green')
                break
            case 'warning':
                setBgColor('yellow')
                break
            case 'error':
                setBgColor('red')
                break
            default:
                setBgColor('blue')
        }
    }, [type])

    // if(!show || !message || !children) return null

    return (
        <>
            {(message || children) && (
                <div
                    className={`bg-${bgColor}-100 border border-${bgColor}-400 text-${bgColor}-700 px-4 py-3 rounded relative mb-3`}
                    role="alert">
                    {message || children}
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className={`fill-current h-6 w-6 text-${bgColor}-500`} role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" onClick={(e) => onClose && onClose(true)}><title>Close</title><path
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
            )}
        </>
    )
}