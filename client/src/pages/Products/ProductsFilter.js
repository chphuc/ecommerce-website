import { useState, useEffect } from 'react'

import { getAllCategory } from '../../utils/categoryUtils'
import { getAllBrand } from '../../utils/brandUtils'
import ProductsFilterItem from './ProductsFilterItem'

const ProductsFilter = ({ handleChangeFilter, getCheckedInput }) => {
    const [dataCategory, setDataCategory] = useState([])
    const [dataBrand, setDataBrand] = useState([])

    useEffect(() => {
        getAllCategory()
            .then(res => setDataCategory(res.data.data))
            .catch(err => console.log(err))
        getAllBrand()
            .then(res => setDataBrand(res.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <p className='mb-2 text-2xl font-medium uppercase'>Filter</p>
            <div className='flex flex-col gap-4'>
                <ProductsFilterItem
                    title="category"
                    data={dataCategory}
                    handleChangeFilter={handleChangeFilter}
                    getCheckedInput={getCheckedInput}
                />
                <ProductsFilterItem
                    title="brand"
                    data={dataBrand}
                    handleChangeFilter={handleChangeFilter}
                    getCheckedInput={getCheckedInput}
                />
            </div>
        </div>
    )
}

export default ProductsFilter