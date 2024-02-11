import React from 'react'

const ProductItem = ({ data }) => {
    return (
        <div key={data._id} className="flex items-centen gap-x-4">
            <div className="flex-1 flex items-center gap-x-4">
                <div>
                    <img src={data.images[0]} className="w-16" />
                </div>
                <div className="flex-1">
                    <p>{data.name}</p>
                    <p>Category: {data.category}</p>
                    <p>x{data.quantity}</p>
                </div>
            </div>
            {
                data.salePrice < data.regularPrice ?
                    <div className="flex items-center gap-x-4">
                        <p className="line-through">${data.regularPrice}.00</p>
                        <p>${data.salePrice}.00</p>
                    </div>
                    :
                    <div>
                        <p>${data.regularPrice}.00</p>
                    </div>
            }
        </div>
    )
}

export default ProductItem