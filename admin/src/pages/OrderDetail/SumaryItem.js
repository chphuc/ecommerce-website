import React from 'react'

const SumaryItem = ({ title, children = [] }) => {
    return (
        <div className='flex flex-col gap-y-4 p-4 border shadow-md rounded-md'>
            <p className='text-xl font-medium'>{title}</p>
            {
                children.length && children.map(item => (
                    <div key={item.title} className='flex flex-wrap items-center justify-between text-gray-500'>
                        <p>{item.title}</p>
                        <p className='font-medium'>{item.value}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default SumaryItem