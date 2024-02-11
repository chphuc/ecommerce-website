import React from 'react'

const index = ({ currentPage, totalPages, handleClick }) => {
    const pagesToShow = []

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pagesToShow.push(i)
        }
    } else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) {
                pagesToShow.push(i)
            }
            pagesToShow.push('...')
            pagesToShow.push(totalPages)
        } else if (currentPage > totalPages - 3) {
            pagesToShow.push(1)
            pagesToShow.push('...')
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pagesToShow.push(i)
            }
        } else {
            pagesToShow.push(1)
            currentPage > 4 && pagesToShow.push('...')
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pagesToShow.push(i)
            }
            totalPages - currentPage > 3 && pagesToShow.push('...')
            pagesToShow.push(totalPages)
        }
    }

    return (
        <div className='flex items-center gap-2'>
            {
                pagesToShow.map((page, index) => (
                    page === '...' ?
                        <span>...</span>
                        :
                        <button
                            key={index}
                            onClick={() => handleClick(page)}
                            className={
                                'block rounded px-2 py-1 text-sm transition-all duration-100 hover:bg-neutral-100 cursor-pointer '
                                + (page === currentPage ? 'bg-blue-100 text-blue-700' : 'bg-transparent text-neutral-700')
                            }
                        >
                            {page}
                        </button>
                ))
            }
        </div>
    )
}

export default index