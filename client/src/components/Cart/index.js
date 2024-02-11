import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { incrementQuantity, decrementQuantity, changeQuantity, removeItem } from '../../features/cart/cartSilce'
import { closeCartModal } from '../../features/cartModal/cartModalSlice'

import CartItem from './CartItem'
import OutsideAlerter from '../OutsideAlerter'
import Button from '../Button'

import { IoMdClose } from 'react-icons/io'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartRedux = useSelector(state => state.cart.cart)

    const [cartStyle, setCartStyle] = useState("translate-x-full")

    const handleCloseCartModal = () => {
        setCartStyle("translate-x-full")

        setTimeout(() => {
            dispatch(closeCartModal())
        }, 300)
    }

    const getTotalCart = () => {
        return cartRedux.reduce((res, item) => {
            const price = item.salePrice < item.regularPrice ? item.salePrice : item.regularPrice
            return res + price * item.quantityInCart
        }, 0)
    }

    const handleFormatNameItemCart = (name) => name.length > 80 ? name.substring(0, 80) + '...' : name

    const handleMoveDetailProductPage = (id) => {
        navigate('/product/' + id)
        handleCloseCartModal()
    }

    const handleIncreaseQuantity = (id) => {
        dispatch(incrementQuantity({ _id: id }))
    }

    const handleDecreaseQuantity = (id) => {
        dispatch(decrementQuantity({ _id: id }))
    }

    const handleChangeQuantity = (id, newQuantity) => {
        dispatch(changeQuantity({ _id: id, quantityInCart: newQuantity }))
    }

    const handleRemoveProduct = (id) => {
        dispatch(removeItem({ _id: id }))
    }

    useEffect(() => {
        setCartStyle("translate-x-0")
    }, [])

    return (
        <div className="flex justify-end fixed top-0 right-0 w-full h-full bg-black bg-opacity-30 z-50">
            <OutsideAlerter todo={handleCloseCartModal} compStyle={"relative w-10/12 md:w-1/3 h-full bg-white px-3 lg:px-6 pt-6 pb-4 transition duration-300 " + cartStyle}>
                <div className="absolute top-0 right-0 text-2xl p-2 cursor-pointer" onClick={handleCloseCartModal}>
                    <IoMdClose />
                </div>
                <div className="flex flex-col h-full">
                    <p className="text-2xl font-medium">Shopping Cart</p>
                    {!cartRedux.length ? (
                        <p>Your cart is currently empty.</p>
                    ) : (
                        <div className="flex flex-col h-full pt-3 pb-10">
                            <div className="flex-1 overflow-y-auto no-scroll md:scroll1">
                                {cartRedux.map(item => (
                                    <CartItem
                                        key={item._id}
                                        data={item}
                                        handleFormatNameItemCart={handleFormatNameItemCart}
                                        handleIncreaseQuantity={handleIncreaseQuantity}
                                        handleDecreaseQuantity={handleDecreaseQuantity}
                                        handleChangeQuantity={handleChangeQuantity}
                                        handleRemoveProduct={handleRemoveProduct}
                                        handleMoveDetailProductPage={handleMoveDetailProductPage}
                                    />
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center justify-between py-4">
                                    <p className="font-medium text-lg">Subtotal</p>
                                    <p className="font-medium text-lg">${getTotalCart()}.00</p>
                                </div>
                                <Link to="/checkout">
                                    <div className="flex-1">
                                        <Button
                                            title="Check out"
                                            onClick={handleCloseCartModal}
                                            type="dark"
                                            size="full"
                                            optionStyle="transition duration-300 hover:scale-[1.02]"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </OutsideAlerter>
        </div>
    )
}

export default Cart
