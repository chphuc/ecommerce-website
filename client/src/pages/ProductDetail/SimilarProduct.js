import { useState, useEffect } from 'react'

import { getSimilarProduct } from '../../utils/productUtils'
import ProductItem from '../../components/ProductItem'

const SimilarProduct = ({ productId }) => {
    const [dataSimilarProduct, setDataSimilarProduct] = useState([])

    useEffect(() => {
        getSimilarProduct(productId, 4)
            .then(res => setDataSimilarProduct(res.data.data))
            .catch(err => console.log(err))
    }, [productId])

    return (
        <div>
            <p className="text-4xl mb-20">You Might Also Like</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    dataSimilarProduct.map(product => (
                        <ProductItem key={product._id} data={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default SimilarProduct