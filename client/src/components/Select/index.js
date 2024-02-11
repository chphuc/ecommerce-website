import React from 'react'

const index = ({ name, value, options = [], onChange }) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
            <option value="">Choose {name}</option>
            {
                options.map((option) => (
                    <option key={option.name} value={option.name}>{option.name}</option>
                ))
            }
        </select>
    )
}

export default index