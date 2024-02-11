import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { notifyError } from '../../components/Toast'
import CheckOutForm from './CheckOutForm'
import CheckOutSummary from './CheckOutSummary'

const Index = () => {
    const navigate = useNavigate()
    const cartRedux = useSelector(state => state.cart.cart)
    const [dataCart, setDataCart] = useState([])
    const feeShip = 2
    const limitFeeShip = 15

    useEffect(() => {
        if (!cartRedux.length) {
            notifyError("No products in the cart")
            navigate("/")
        } else {
            setDataCart(cartRedux)
        }
    }, [cartRedux])

    return (
        <div className="flex lg:flex-row-reverse flex-wrap px-3 lg:pt-4 lg:px-12">
            <div className="w-full lg:w-2/5">
                <CheckOutSummary dataCart={dataCart} feeShip={feeShip} limitFeeShip={limitFeeShip} />
            </div>
            <div className="w-full lg:w-3/5">
                <CheckOutForm dataCart={dataCart} feeShip={feeShip} limitFeeShip={limitFeeShip} />
            </div>
        </div>
    )
}

export default Index