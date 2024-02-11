import React from 'react'

const index = ({ children }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-50">
            <div className="h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default index