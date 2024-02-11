import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addToCart } from '../../features/cart/cartSilce'
import { notifySuccess } from '../../components/Toast'
import QuickViewImages from './QuickViewImages'
import OutsideAlerter from '../OutsideAlerter'
import Button from '../../components/Button'

import { HiMinusSm } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

const QuickView = ({ data, onClose }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => (prev + 1 >= data.quantity ? data.quantity : prev + 1))
    }

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => (prev - 1 <= 0 ? 1 : prev - 1))
    }

    const handleChangeQuantity = e => {
        if (e.target.value <= 0) return setQuantity(1)
        setQuantity(e.target.value >= data.quantity ? data.quantity : e.target.value)
    }

    const handleAddCart = () => {
        dispatch(addToCart({ ...data, quantityInCart: quantity }))
        notifySuccess('Added to your cart')
    }

    const handleClickDetail = () => {
        navigate(`/product/${data._id}`)
        onClose()
    }

    return (
        <OutsideAlerter todo={onClose} compStyle={"w-11/12 lg:w-3/5 h-5/6 flex flex-col lg:flex-row p-4 gap-4 bg-white shadow-md rounded-md"}>
            <div className='flex-1 h-full overflow-hidden'>
                <QuickViewImages data={data.images} />
            </div>
            <div className='flex-1 flex flex-col gap-4'>
                <p className="text-3xl mb-2">{data.name}</p>
                <p className="text-sm text-gray-600">{data.description}</p>
                <div className='flex'>
                    <Button
                        title="Detail"
                        onClick={handleClickDetail}
                        type="link"
                        size="lg"
                        optionStyle='px-0 pt-0 pb-0'
                    />
                </div>
                <div className="flex items-center gap-x-2">
                    <p className={"text-2xl " + (data.salePrice < data.regularPrice ? "line-through" : "")}>${data.regularPrice}.00</p>
                    {data.salePrice < data.regularPrice && <p className="text-2xl">${data.salePrice}.00</p>}
                </div>
                <p className="font-medium">Quantity</p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center rounded bg-slate-200">
                        <button className="p-3 h-10" onClick={handleDecreaseQuantity}>
                            <HiMinusSm />
                        </button>
                        <input className="w-9 text-center bg-slate-200 outline-none" type="number" value={quantity} onChange={handleChangeQuantity} />
                        <button className="p-3 h-10" onClick={handleIncreaseQuantity}>
                            <IoMdAdd />
                        </button>
                    </div>
                    <Button
                        title="Add to cart"
                        onClick={handleAddCart}
                        type="dark"
                        size="full"
                        optionStyle='hover:scale-[1.02]'
                    />
                </div>
            </div>
        </OutsideAlerter >
    )
}

export default QuickView