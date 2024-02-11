import { useState, useEffect } from 'react'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { getStatisticTransaction } from '../../utils/StatisticUtils'

const StatisticTransaction = ({ timeOption }) => {
    const [dataTransaction, setDataTransaction] = useState([])

    useEffect(() => {
        getStatisticTransaction(timeOption)
            .then(res => {
                let newData = []
                for (let key in res.data.data) {
                    newData.push({
                        date: res.data.data[key]._id,
                        revenue: res.data.data[key].totalRevenue,
                        orders: res.data.data[key].totalOrder
                    })
                }
                setDataTransaction(newData)
            })
            .catch(err => console.log(err))
    }, [timeOption])

    return (
        <>
            {
                dataTransaction.length ?
                    <div className='flex flex-col gap-4'>
                        <p className='text-lg text-center uppercase'>Revenue by time</p>
                        <ResponsiveContainer height={300}>
                            <ComposedChart
                                data={dataTransaction}
                                margin={{
                                    left: -20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="orders" barSize={30} fill="#413ea0" background={{ fill: '#eee' }} />
                                <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    :
                    <div>
                        Loading...
                    </div>
            }
        </>
    )
}

export default StatisticTransaction