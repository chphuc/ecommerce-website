import React from 'react'

const index = ({ title, onClick, type = 'default', size = 'md', optionStyle = '', ...props }) => {
    const sizeStyle = {
        none: ' ',
        sm: 'px-4 pt-2 pb-1.5 text-xs' + ' ',
        md: 'px-6 pt-2.5 pb-2 text-xs' + ' ',
        lg: 'px-8 pt-3 pb-2.5 text-sm' + ' '
    }

    const typeStyle = {
        none: ' ',
        default: 'text-white bg-blue-500 active:bg-blue-400' + ' ',
        outline: 'border active:bg-gray-100' + ' ',
        success: 'text-white bg-green-600 active:bg-green-500' + ' ',
        danger: 'text-white bg-red-600 active:bg-red-500' + ' '
    }

    return (
        <button
            {...props}
            className={'font-medium uppercase rounded shadow-md ' + sizeStyle[size] + typeStyle[type] + optionStyle}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default index