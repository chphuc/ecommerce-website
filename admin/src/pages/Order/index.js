import { useState, useEffect } from 'react'
import { getStatus } from '../../utils/StatusUtils'
import { getAllOrder } from '../../utils/OrderUtils'

import Button from '../../components/Button'
import OrderItem from './OrderItem'
import Search from '../../components/Search'
import Pagination from '../../components/Pagination'

const Index = () => {
    const [dataOriginOrder, setDataOriginOrder] = useState([])
    const [dataOrder, setDataOrder] = useState([])
    const [status, setStatus] = useState([])
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const limit = 5
    const [page, setPage] = useState(1)

    const getCurrentOrderPage = () => {
        return dataOrder.length <= limit ? dataOrder : dataOrder.slice((page - 1) * limit, page * limit)
    }

    const handleChangePage = (page) => {
        setPage(page)
    }

    const handleOnChangeSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        getStatus()
            .then(res => setStatus(res.data.data.map(item => item.name)))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getAllOrder()
            .then(res => {
                setDataOriginOrder(res.data.data)
                setDataOrder(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (filter === 'all') setDataOrder(dataOriginOrder.filter(order => order._id.includes(search)))
        else setDataOrder(dataOriginOrder.filter(order => order.status === filter && order._id.includes(search)))

        setPage(1)
    }, [filter, search])

    return (
        <div className='h-full flex flex-col gap-y-4 p-2 lg:px-6 lg:py-4'>
            <div className='flex flex-wrap-reverse items-center justify-between gap-y-2'>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
                    <Button
                        type='outline'
                        optionStyle={'' + (filter === 'all' ? 'bg-slate-200' : '')}
                        title='all'
                        onClick={() => setFilter('all')}
                    />
                    {
                        status.length && status.map(item => (
                            <Button
                                key={item}
                                type='outline'
                                optionStyle={'' + (filter === item ? 'bg-slate-200' : '')}
                                title={item}
                                onClick={() => setFilter(item)}
                            />
                        ))
                    }
                </div>
                <div className='flex-1 lg:flex-none'>
                    <Search
                        title='Search order by ID'
                        value={search}
                        onChange={handleOnChangeSearch}
                    />
                </div>
            </div>
            <div className='flex-1 flex flex-col gap-y-4'>
                <div>
                    <p>View Product: <span className='font-medium'>{getCurrentOrderPage().length}</span>/{dataOrder.length}</p>
                </div>
                <div className='flex-1 flex flex-col gap-y-4'>
                    {
                        dataOrder.length ?
                            getCurrentOrderPage().map(order => (
                                <OrderItem key={order._id} data={order} />
                            ))
                            :
                            <div className='h-full flex items-center justify-center'>
                                Empty
                            </div>
                    }
                </div>
                <div className='flex justify-end pb-4'>
                    {
                        dataOrder.length > limit &&
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(dataOrder.length / limit)}
                            handleClick={handleChangePage}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Index