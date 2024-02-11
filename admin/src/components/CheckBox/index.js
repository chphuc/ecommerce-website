import React from 'react'

const index = ({ name, value, checked, onChange }) => {
    return (
        <div className='flex items-center gap-x-4 my-1'>
            <input checked={checked} name={name} type='checkbox' value={value} onChange={onChange} />
            <label className='block text-sm font-medium text-gray-500'>{value}</label>
        </div>
    )
}

export default index