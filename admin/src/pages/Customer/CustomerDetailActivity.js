import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getStatus } from '../../utils/StatusUtils'
import Button from '../../components/Button'
import Pagination from '../../components/Pagination'

const CustomerDetailActivity = ({ props }) => {
    const [dataOrder, setDataOrder] = useState([])
    const [dataStatus, setDataStatus] = useState([])
    const [filter, setFilter] = useState("all")
    const limit = 10
    const [page, setPage] = useState(1)

    const getCurrentActivityPage = () => {
        return dataOrder.length <= limit ? dataOrder : dataOrder.slice((page - 1) * limit, page * limit)
    }

    const handleChangePage = (page) => {
        setPage(page)
    }

    useEffect(() => {
        getStatus()
            .then(res => setDataStatus(res.data.data.map(item => item.name)))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (filter === 'all') setDataOrder(props.dataUserOrder)
        else setDataOrder(props.dataUserOrder.filter(order => order.status === filter))
    }, [filter])

    return (
        <div>
            {
                props.dataUserOrder.length ?
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-wrap items-center gap-4'>
                            <Button
                                title='all'
                                type='none'
                                size='none'
                                optionStyle={'text-xs px-2 py-1 rounded-none shadow-none ' + (filter === 'all' ? 'border-b-2 border-blue-500' : '')}
                                onClick={() => setFilter('all')}
                            />
                            {
                                dataStatus.length && dataStatus.map(item => (
                                    <Button
                                        key={item}
                                        title={item}
                                        type='none'
                                        size='none'
                                        optionStyle={'text-xs px-2 py-1 rounded-none shadow-none ' + (filter === item ? 'border-b-2 border-blue-500' : '')}
                                        onClick={() => setFilter(item)}
                                    />
                                ))
                            }
                        </div>
                        <div className='flex flex-col gap-4'>
                            <table className='w-full text-sm text-left text-gray-500'>
                                <thead className='text-xs text-gray-700 uppercase'>
                                    <tr>
                                        <th scope='col' className='px-6 py-3'>
                                            ID
                                        </th>
                                        <th scope='col' className='px-6 py-3'>
                                            Total
                                        </th>
                                        <th scope='col' className='px-6 py-3'>
                                            Status
                                        </th>
                                        <th scope='col' className='px-6 py-3'>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getCurrentActivityPage().map((order, index) => (
                                            <tr key={index} className={'border-b ' + (index % 2 ? '' : 'bg-gray-50')}>
                                                <td className='px-6 py-3'>
                                                    {index + 1}
                                                </td>
                                                <td className='px-6 py-3'>
                                                    {order.total}.00
                                                </td>
                                                <td className='px-6 py-3'>
                                                    {order.status}
                                                </td>
                                                <td className='px-6 py-3'>
                                                    <Link to={`/orders/${order._id}`}>
                                                        <Button
                                                            title='Detail'
                                                            type='none'
                                                            optionStyle='px-0 text-blue-500 underline active:text-blue-400 shadow-none'
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                dataOrder.length > limit &&
                                <div className='flex justify-end'>
                                    <Pagination
                                        currentPage={page}
                                        totalPages={Math.ceil(dataOrder.length / limit)}
                                        handleClick={handleChangePage}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <p>Empty Activity</p>
                    </div>
            }
        </div >
    )
}

export default CustomerDetailActivity