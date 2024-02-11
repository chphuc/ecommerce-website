import { useState, useEffect } from 'react'

import { getStatus } from '../../utils/statusUtils'
import { getOrdersByUser } from '../../utils/orderUtils'

import OrderItem from './OrderItem'
import noOrderImage from '../../assets/noorder.png'

const Index = () => {
    const [dataStatus, setDataStatus] = useState([])
    const [dataOriginOrders, setDataOriginOrders] = useState([])
    const [dataOrders, setDataOrders] = useState([])
    const [filters, setFilters] = useState("all")

    const handleChangeFilters = (status) => {
        setFilters(status)
    }

    useEffect(() => {
        getStatus()
            .then(res => {
                setDataStatus(res.data.data.map(item => item.name))
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getOrdersByUser()
            .then(res => {
                setDataOriginOrders(res.data.data)
                setDataOrders(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (filters === "all") setDataOrders(dataOriginOrders)
        else setDataOrders(dataOriginOrders.filter(order => filters === order.status))
    }, [filters])

    return (
        <div>
            <div className="border-b px-6 py-4">
                <p className="text-xl">My Order</p>
                <p className="text-gray-600">Manage order information for account</p>
            </div>
            <div className="p-4">
                {
                    !dataOriginOrders.length ?
                        <div className="flex flex-col items-center justify-center">
                            <img alt='noorder' className="w-60" src={noOrderImage} />
                            <p className="text-xl font-medium">You haven't placed any orders yet</p>
                        </div>
                        :
                        <div>
                            <div className="flex items-center gap-x-8">
                                <button onClick={() => handleChangeFilters('all')}>
                                    <p className={" " + (filters.includes("all") ? "font-medium underline" : "")}>All</p>
                                </button>
                                {
                                    dataStatus.map(item => (
                                        <button key={item} onClick={() => handleChangeFilters(item)}>
                                            <p className={" " + (filters.includes(item) ? "font-medium underline" : "")}>{item}</p>
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="flex flex-col gap-y-4 mt-4">
                                {
                                    dataOrders.map(item => (
                                        <OrderItem key={item._id} data={item} />
                                    ))
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Index