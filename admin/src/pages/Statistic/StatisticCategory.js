import { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { getStatisticCategory } from '../../utils/StatisticUtils'

const StatisticChart = ({ timeOption }) => {
    const [dataCategory, setDataCategory] = useState([])

    useEffect(() => {
        getStatisticCategory(timeOption)
            .then(res => {
                setDataCategory(res.data.data.map(item => ({
                    name: item._id,
                    quantity: item.quantity,
                    revenue: item.revenue
                })))
            })
            .catch(err => console.log(err))
    }, [timeOption])

    return (
        <>
            {
                dataCategory.length ?
                    <div className='flex flex-col gap-4'>
                        <p className='text-lg text-center uppercase'>Revenue by category</p>
                        <ResponsiveContainer height={300}>
                            <BarChart
                                data={dataCategory}
                                margin={{
                                    left: -20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="quantity" barSize={30} fill="#27aeef" background={{ fill: '#eee' }} />
                                <Bar dataKey="revenue" barSize={30} fill="#3949AB" background={{ fill: '#eee' }} />
                            </BarChart>
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

export default StatisticChart