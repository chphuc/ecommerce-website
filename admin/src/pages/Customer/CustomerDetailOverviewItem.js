import React from 'react'

const CustomerDetailOverviewItem = ({ title, value }) => {
    return (
        <div className='p-4 font-medium text-center border shadow-md'>
            <p>{title}</p>
            <p className='text-2xl'>{value}</p>
        </div>
    )
}

export default CustomerDetailOverviewItem