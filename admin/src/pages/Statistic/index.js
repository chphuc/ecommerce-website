import { useState } from 'react'

import StatisticOrder from './StatisticOrder'
import StatisticCategory from './StatisticCategory'
import StatisticTransaction from './StatisticTransaction'
import StatisticBrand from './StatisticBrand'
import Select from '../../components/Select'

const Index = () => {
    const dataTimeOption = [
        {
            name: 'The last 7 days',
            value: 'last7days'
        },
        {
            name: 'The last 30 days',
            value: 'last30days'
        },
        {
            name: 'The last 3 months',
            value: 'last3months'
        },
        {
            name: 'The last 6 months',
            value: 'last6months'
        },
        {
            name: 'The last 12 months',
            value: 'last12months'
        }
    ]
    const [timeOption, setTimeOption] = useState(dataTimeOption[0].value)

    const handleChangeSelect = e => {
        setTimeOption(e.target.value)
    }

    return (
        <div className='flex flex-col gap-4 p-2 lg:px-6 lg:py-4'>
            <div className='flex justify-end'>
                <div>
                    <Select
                        name='timeOption'
                        valueCurrent={timeOption}
                        value={dataTimeOption}
                        onChange={handleChangeSelect}
                    />
                </div>
            </div>
            <StatisticOrder timeOption={timeOption} />
            <div className='flex flex-wrap lg:flex-nowrap gap-4'>
                <div className='w-full lg:w-1/2'>
                    <StatisticCategory timeOption={timeOption} />
                </div>
                <div className='w-full lg:w-1/2'>
                    <StatisticBrand timeOption={timeOption} />
                </div>
            </div>
            <StatisticTransaction timeOption={timeOption} />
        </div>
    )
}

export default Index