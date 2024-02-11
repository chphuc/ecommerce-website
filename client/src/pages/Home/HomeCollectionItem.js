import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getQuantityByCategory } from '../../utils/categoryUtils'
import { HiArrowRight } from 'react-icons/hi'

const HomeCollectionItem = ({ data }) => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(0)
    const [isItemHover, setIsItemHover] = useState(false)

    const hoverItemEvent = () => {
        setIsItemHover(true)
    }
    const notHoverItemEvent = () => {
        setIsItemHover(false)
    }

    const handleNavigate = () => {
        navigate('/products', {
            state: {
                category: data.name
            }
        })
    }

    useEffect(() => {
        getQuantityByCategory(data.name)
            .then(res => setQuantity(res.data.quantity))
            .catch(err => console.log(err))
    }, [])

    return (
        <div
            style={{
                width: '276px',
                height: '373px',
                backgroundImage: `url("${data.image}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            onMouseEnter={hoverItemEvent}
            onMouseLeave={notHoverItemEvent}
            onClick={handleNavigate}
            className="flex flex-col justify-end cursor-pointer"
        >
            <div className="flex items-center justify-between px-7 py-5">
                <div>
                    <p className="text-black text-lg md:text-xl font-medium">{data.name}</p>
                    <p className="mt-4 text-color-subtext">{quantity} items</p>
                </div>
                <div className={"relative w-11 h-11 " + (isItemHover ? "text-white" : "text-black")}>
                    <div className={"w-full h-full rounded-full hover:scale-110 transition duration-200 " + (isItemHover ? "bg-black" : "bg-white")}>
                    </div>
                    <button style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} className="absolute z-10 pointer-events-none">
                        <HiArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeCollectionItem