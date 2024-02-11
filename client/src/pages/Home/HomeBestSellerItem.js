import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Modal from '../../components/Modal'
import QuickView from '../../components/QuickView'

import { addToCart } from '../../features/cart/cartSilce'
import { notifySuccess } from '../../components/Toast'
import { RiShoppingBagLine } from 'react-icons/ri'
import { AiOutlineEye } from 'react-icons/ai'

const HomeBestSellerItem = ({ data }) => {
    const dispatch = useDispatch()
    const [isHoverCard, setIsHoverCard] = useState(false)
    const [isHoverImage, setIsHoverImage] = useState(false)
    const [showQuickView, setShowQuickView] = useState(false)

    const handleOpenQuickView = () => setShowQuickView(true)
    const handleCloseQuickView = () => setShowQuickView(false)

    const handleAddCart = () => {
        dispatch(addToCart({ ...data, quantityInCart: 1 }))
        notifySuccess('Added to your cart')
    }

    const cardAction = [
        {
            title: "select options",
            icon: <RiShoppingBagLine />,
            onClick: handleAddCart
        },
        {
            title: "Quick view",
            icon: <AiOutlineEye />,
            onClick: handleOpenQuickView
        },
    ]

    const handleFormatName = (name) => {
        return name.length > 25 ? name.substring(0, 25) + '...' : name
    }

    return (
        <div>
            {
                showQuickView &&
                <Modal>
                    <QuickView
                        onClose={handleCloseQuickView}
                        data={data}
                    />
                </Modal>
            }
            <div className={"cursor-pointer md:px-4 pb-10 transition duration-200 " + (isHoverCard ? "shadow-lg" : "shadow-none	")} onMouseEnter={() => setIsHoverCard(true)} onMouseLeave={() => setIsHoverCard(false)}>
                <div className="relative">
                    <div className="overflow-hidden relative" onMouseEnter={() => setIsHoverImage(true)} onMouseLeave={() => setIsHoverImage(false)}>
                        {/* Cart Image */}
                        <Link to={`/product/${data._id}`}>
                            <div className="relative">
                                {/* Cart Image Main*/}
                                <div className="w-64 h-64">
                                    <img className="w-full h-full object-cover" src={data.images[0]} alt="Main Image" />
                                </div>
                                {/* Cart Image Hover*/}
                                <div>
                                    <img className={"w-64 absolute top-0 left-0 z-10 transition duration-700 " + (isHoverImage ? "opacity-100" : "opacity-0")} src={data.images[1]} />
                                </div>
                            </div>
                        </Link>
                        {/* Card Action */}
                        <div className={"hidden md:block w-full absolute -bottom-12 left-0 transition duration-200 z-20	" + (isHoverCard ? "-translate-y-16" : "")}>
                            <div className="flex items-center justify-center">
                                <span className="rounded overflow-hidden shadow-md">
                                    {
                                        cardAction.map((item, index) => (
                                            <button onClick={item.onClick} key={item.title} className={"p-3.5 bg-white hover:bg-black hover:text-white transition duration-200 " + (index != 0 ? "border-l" : "")}>
                                                {item.icon}
                                            </button>
                                        ))
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Link to="/product/1">
                        <p className="font-medium mb-1">{handleFormatName(data.name)}</p>
                    </Link>
                    <div className="flex items-center gap-x-2">
                        <p className={" " + (data.salePrice < data.regularPrice ? "line-through" : "font-medium")}>${data.regularPrice}.00</p>
                        {data.salePrice < data.regularPrice && <p className="font-medium">${data.salePrice}.00</p>}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default HomeBestSellerItem