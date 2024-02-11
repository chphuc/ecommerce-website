import { useState, useEffect } from 'react'

import { getAllProduct } from '../../utils/productUtils'
import HomeBestSellerItem from './HomeBestSellerItem'

const HomeBestSeller = () => {
    const [data, setData] = useState([])
    const [curItems, setCurItems] = useState(10)

    const handleClickLoadMore = () => {
        setCurItems((prev) => (prev + 10 > data.length ? data.length : prev + 10))
    }

    useEffect(() => {
        getAllProduct()
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="">
            <p className="text-3xl text-center mb-10">Best Seller</p>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {
                    data.map((item, index) => (
                        index < curItems && <HomeBestSellerItem key={index} data={item} />
                    ))
                }
            </div>
            <div className="mt-12 flex justify-center">
                {
                    curItems < data.length &&
                    <button onClick={handleClickLoadMore} className="w-full lg:w-auto py-2 px-7 font-medium border border-black rounded hover:text-white hover:bg-black hover:scale-110 transition duration-300">
                        Load More
                    </button>
                }
            </div>
        </div>
    )
}

export default HomeBestSeller