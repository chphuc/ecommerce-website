import React from 'react'

const index = ({ name, valueCurrent, value, onChange }) => {
    return (
        <select value={valueCurrent} name={name} onChange={onChange} className="px-4 py-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full">
            {value.map((item, index) => (
                <option key={index} value={item.value}>{item.name}</option>
            ))}
        </select>
    )
}

export default index