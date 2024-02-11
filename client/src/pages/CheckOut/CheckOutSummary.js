import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';


const CheckOutSummary = ({ dataCart, feeShip, limitFeeShip }) => {
    const [showOrderSummary, setShoowOrderSummary] = useState(true)

    const handleFormatName = name => {
        return name.length > 60 ? name.substring(0, 60) + '...' : name
    }

    const getTotalCart = () => {
        let res = 0
        dataCart.map(item => res += item.salePrice < item.regularPrice ? item.salePrice * item.quantityInCart : item.regularPrice * item.quantityInCart)

        return res
    }

    return (
        <div className="lg:px-10">
            <div className="lg:hidden" onClick={() => setShoowOrderSummary(prev => !prev)}>
                <div className="py-3 border-y flex items-center justify-between">
                    <div className="flex items-center text-sky-800">
                        <span className="text-lg">
                            <AiOutlineShoppingCart />
                        </span>
                        <p className="mx-2">Show order summary</p>
                        <span className="text-lg">
                            {showOrderSummary ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                        </span>
                    </div>
                    <p className="font-medium text-lg text-green-600">${getTotalCart()}.00</p>
                </div>
            </div>
            {
                showOrderSummary &&
                <>
                    <div className="w-full h-96 pt-3 pr-3 overflow-y-auto scroll1">
                        {
                            dataCart?.map((item, index) => (
                                <div key={index} className="flex items-center font-medium mb-3">
                                    <Link to={'/product/' + item._id}>
                                        <div className="relative">
                                            <img className="w-16 rounded" src={item.images[0]} />
                                            <span className="absolute -top-2 -right-2 flex items-center justify-center text-white text-xs w-5 h-5 rounded-full bg-slate-500"><span>{item.quantityInCart}</span></span>
                                        </div>
                                    </Link>
                                    <Link className='flex-1' to={'/product/' + item._id}>
                                        <p className="px-4">{handleFormatName(item.name)}</p>
                                    </Link>
                                    <div className="flex items-center gap-x-2">
                                        <p className={" " + (item.salePrice < item.regularPrice ? "line-through" : "font-medium")}>${item.regularPrice}.00</p>
                                        {item.salePrice < item.regularPrice && <p className="font-medium">${item.salePrice}.00</p>}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="py-3 my-4 border-y">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="font-medium">${getTotalCart()}.00</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="font-medium">{getTotalCart() > limitFeeShip ? "Free" : `$${feeShip}.00`}</p>
                        </div>
                    </div>
                    <div className="lg:mb-4 flex items-center justify-between font-medium">
                        <p className="text-xl">Total</p>
                        <p className="text-2xl text-green-600">${getTotalCart() > limitFeeShip ? getTotalCart() : getTotalCart() + feeShip}.00</p>
                    </div>
                </>
            }
        </div>
    )
}

export default CheckOutSummary