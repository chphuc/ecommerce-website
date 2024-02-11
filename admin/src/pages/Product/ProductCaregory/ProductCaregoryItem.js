import { useState } from 'react'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Pagination from '../../../components/Pagination'

const ProductCaregoriesItem = ({ title, typeElement, dataElements, handleCreateElement, handleOpenEdit, handleOpenRemove }) => {
    const [input, setInput] = useState({
        name: '',
        image: ''
    })
    const [page, setPage] = useState(1)
    const limit = 5

    const handleChangePage = page => {
        setPage(page)
    }

    const getCurrentDataPage = () => {
        return dataElements.length <= limit ? dataElements : dataElements.slice((page - 1) * limit, page * limit)
    }

    const handleChangeInput = e => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()

        handleCreateElement(typeElement, input)
        setInput({
            name: '',
            image: ''
        })
    }

    return (
        <div className='h-full flex flex-col gap-4'>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium text-gray-500">{title}</label>
                <div className='flex flex-col gap-4'>
                    <Input
                        name='name'
                        placeholder={'Add New Name ' + title.split(' ').pop()}
                        type='text'
                        value={input.name}
                        onChange={handleChangeInput}
                    />
                    <Input
                        name='image'
                        placeholder={'Add New Image ' + title.split(' ').pop()}
                        type='text'
                        value={input.image}
                        onChange={handleChangeInput}
                    />
                    <div className='flex justify-end'>
                        <Button
                            size='sm'
                            title="Create"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </form>
            <div className='relative overflow-x-auto'>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3" />
                            <th scope="col" className="px-6 py-3" >
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {title.split(' ').pop()}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getCurrentDataPage().map((item, index) => (
                                index < limit &&
                                <tr key={index} className="border-b">
                                    <th scope="col" className="px-6 py-3">
                                        {index + 1}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <img alt='' className='h-10' src={item.image} />
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {item.name}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className='flex gap-2'>
                                            <Button
                                                title='Edit'
                                                type='none'
                                                size='sm'
                                                onClick={() => handleOpenEdit(typeElement, item._id)}
                                                optionStyle='px-0 font-medium text-blue-600 hover:underline shadow-none'
                                            />
                                            <Button
                                                title='Remove'
                                                type='none'
                                                size='sm'
                                                onClick={() => handleOpenRemove(typeElement, item._id)}
                                                optionStyle='px-0 font-medium text-red-600 hover:underline shadow-none'
                                            />
                                        </div>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                dataElements.length > limit &&
                <div className='flex justify-end'>
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil(dataElements.length / limit)}
                        handleClick={handleChangePage}
                    />
                </div>
            }
        </div>
    )
}

export default ProductCaregoriesItem