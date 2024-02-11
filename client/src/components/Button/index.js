import React from 'react'

const index = ({ title, onClick, type = 'default', size = 'md', optionStyle = '', children = <></> }) => {
    const sizeStyle = {
        sm: 'px-4 pt-2 pb-1.5 text-xs' + ' ',
        md: 'px-6 pt-2.5 pb-2 text-xs' + ' ',
        lg: 'px-8 pt-3 pb-2.5 text-sm' + ' ',
        full: 'w-full px-8 pt-3 pb-2.5 text-sm' + ' ',
    }

    const typeStyle = {
        none: '' + ' ',
        default: 'text-white bg-blue-500 active:bg-blue-400' + ' ',
        outline: 'border active:bg-gray-100' + ' ',
        dark: 'text-white bg-black' + ' ',
        outlineToDark: 'bg-white hover:bg-black hover:text-white' + ' ',
        success: 'text-white bg-green-600 active:bg-green-500' + ' ',
        link: 'text-blue-500 underline active:text-blue-400' + ' ',
    }

    return (
        <button
            className={'font-medium uppercase rounded transition duration-300 ' + sizeStyle[size] + typeStyle[type] + optionStyle}
            onClick={onClick}
        >
            {children}
            <p>{title}</p>
        </button>
    )
}

export default index