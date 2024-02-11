import React from 'react'

const index = (props) => {
    return (
        <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:bg-neutral-100 disabled:text-gray-400"
            style={{ resize: "none" }}
            {...props}
        />
    )
}

export default index