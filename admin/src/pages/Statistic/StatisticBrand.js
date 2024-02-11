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
import { getStatisticBrand } from '../../utils/StatisticUtils'

const StatisticBrand = ({ timeOption }) => {
    const [dataBrand, setDataBrand] = useState([])

    useEffect(() => {
        getStatisticBrand(timeOption)
            .then(res => {
                let newData = []
                for (let key in res.data.data) {
                    newData.push({
                        name: res.data.data[key]._id,
                        revenue: res.data.data[key].totalSale
                    })
                }
                setDataBrand(newData)
            })
            .catch(err => console.log(err))
    }, [timeOption])

    return (
        <>
            {
                dataBrand.length ?
                    <div className='flex flex-col gap-4'>
                        <p className='text-lg text-center uppercase'>Revenue by brand</p>
                        <ResponsiveContainer height={300}>
                            <BarChart
                                data={dataBrand}
                                margin={{
                                    left: -20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
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

export default StatisticBrand