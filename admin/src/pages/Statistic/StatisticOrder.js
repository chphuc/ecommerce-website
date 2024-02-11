import { useState, useEffect } from 'react'
import { getStatisticOrder } from '../../utils/StatisticUtils'

const StatisticOrder = ({ timeOption }) => {
    const [dataOrder, setDataOrder] = useState([])

    useEffect(() => {
        getStatisticOrder(timeOption)
            .then(res => setDataOrder([
                {
                    title: 'Total orders',
                    value: res.data.data.totalOrder
                },
                {
                    title: 'Total confirm orders',
                    value: res.data.data.totalConfirmOrder
                },
                {
                    title: 'Total pending orders',
                    value: res.data.data.totalPendingOrder
                },
                {
                    title: 'Total decline orders',
                    value: res.data.data.totalDeclineOrder
                },
                {
                    title: 'Average revenue',
                    value: res.data.data.averageRevenue + ',00'
                },
                {
                    title: 'Total revenue',
                    value: res.data.data.totalRevenue + ',00'
                }
            ]))
            .catch(err => console.log(err))
    }, [timeOption])

    return (
        <>
            {
                dataOrder.length ?
                    <div className='flex flex-wrap gap-4'>
                        {
                            dataOrder.map(item => (
                                <div
                                    key={item.title}
                                    className='flex-1 basis-1/3 lg:basis-auto pr-4 py-2 text-right bg-zinc-100 border shadow-md rounded-md'
                                >
                                    <p className='text-sm'>{item.title}</p>
                                    <p className='text-2xl'>{item.value}</p>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div>
                        Loading...
                    </div>
            }
        </>
    )
}

export default StatisticOrder