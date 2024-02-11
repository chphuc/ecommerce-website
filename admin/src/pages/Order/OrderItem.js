import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'

const OrderItem = ({ data }) => {
    const [limitProducts, setLitmitProducts] = useState(2)

    const handleLoadMore = (limit) => {
        setLitmitProducts(limit)
    }

    return (
        <div className="border">
            <div
                className={"flex items-center justify-between gap-x-4 px-4 py-1 text-xs text-slate-500 border-b " +
                    (data.status === 'confirm' ? 'bg-green-100' : data.status === 'decline' ? 'bg-red-100' : 'bg-gray-100')}
            >
                <div className="flex items-center gap-x-4">
                    <p>Date: {data.createdAt.slice(0, 10)}</p>
                    <p>Order ID: {data._id}</p>
                </div>
                <div>
                    <p className="uppercase">{data.status}</p>
                </div>
            </div>
            <Link to={data._id} className="flex flex-col gap-y-4 p-4">
                {
                    data.products.map((product, index) => index < limitProducts && (
                        <div key={product._id} className="flex items-centen gap-x-4">
                            <div className="flex-1 flex items-center gap-x-4">
                                <div>
                                    <img alt='' src={product.images[0]} className="w-16" />
                                </div>
                                <div className="flex-1">
                                    <p>{product.name}</p>
                                    <p>Category: {product.category}</p>
                                    <p>x{product.quantity}</p>
                                </div>
                            </div>
                            {
                                product.salePrice < product.regularPrice ?
                                    <div className="flex items-center gap-x-4">
                                        <p className="line-through">${product.regularPrice}.00</p>
                                        <p>${product.salePrice}.00</p>
                                    </div>
                                    :
                                    <div>
                                        <p>${product.regularPrice}.00</p>
                                    </div>
                            }
                        </div>
                    ))
                }
            </Link>
            {
                data.products.length > limitProducts &&
                <div className="flex justify-center py-4">
                    <Button
                        title='Load more'
                        type='none'
                        onClick={() => handleLoadMore(data.products.length)}
                        optionStyle='text-blue-500 font-medium underline active:text-blue-400 shadow-none'
                    />
                </div>
            }
            <div className="p-4 border-t bg-gray-100">
                <div className="flex items-center justify-end gap-x-4 font-medium">
                    <p>Total:</p>
                    <p className="text-2xl text-green-600">${data.total}.00</p>
                </div>
            </div>
        </div>
    )
}

export default OrderItem