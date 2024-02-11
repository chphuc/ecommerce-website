import React from 'react'

const index = (prop) => {
    return (
        <input
            className="p-2 border border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full disabled:bg-neutral-100 disabled:text-gray-400"
            {...prop}
        />
    )
}

export default index