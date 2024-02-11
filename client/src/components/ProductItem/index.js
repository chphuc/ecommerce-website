import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { addToCart } from '../../features/cart/cartSilce'
import { notifySuccess } from '../Toast'
import QuickView from '../QuickView'
import Modal from '../Modal'
import Button from '../Button'

import { AiOutlineEye } from 'react-icons/ai'

const Index = ({ data }) => {
    const dispatch = useDispatch()
    const [isHoverImage, setIsHoverImage] = useState(false)
    const [showQuickView, setShowQuickView] = useState(false)

    const handleOpenQuickView = () => setShowQuickView(true)
    const handleCloseQuickView = () => setShowQuickView(false)

    const dataAction = [
        {
            title: "Quick View",
            icon: <AiOutlineEye />,
            onClick: () => { handleOpenQuickView() }
        },
    ]

    const handleForMatProductName = name => {
        return name.length > 20 ? name.substring(0, 20) + '...' : name
    }

    const handleQuickAdd = () => {
        dispatch(addToCart({ ...data, quantityInCart: 1 }))
        notifySuccess('Added to your cart')
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
            <div>
                <div className="overflow-hidden cursor-pointer relative" onMouseEnter={() => setIsHoverImage(true)} onMouseLeave={() => setIsHoverImage(false)}>
                    <Link to={`/product/${data._id}`}>
                        <img alt='' src={data.images[0]} />
                    </Link>
                    <div className={"absolute top-0 -right-14 flex flex-col pt-4 pr-4 transition duration-200 z-10 " + (isHoverImage ? "-translate-x-14" : "")}>
                        {
                            dataAction.map(item => (
                                <Tippy key={item.title} content={item.title} placement="left">
                                    <button onClick={item.onClick} className="shadow-lg flex items-center justify-center bg-white rounded-full w-10 h-10 hover:bg-black hover:text-white hover:scale-110 transition duration-300">
                                        {item.icon}
                                    </button>
                                </Tippy>
                            ))
                        }
                    </div>
                    <div className={"absolute -bottom-12 w-full px-6 transition duration-200 " + (isHoverImage ? "-translate-y-16" : "")}>
                        <Button
                            title="Quick Add"
                            onClick={handleQuickAdd}
                            type="outlineToDark"
                            size="full"
                            optionStyle="shadow-md"
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <Link to={`/product/${data._id}`}>
                        <p className="font-medium hover:text-gray-500 transition ease-in-out">{handleForMatProductName(data.name)}</p>
                    </Link>
                    <div className="flex items-center gap-x-2">
                        <p className={" " + (data.salePrice < data.regularPrice ? "line-through" : "font-medium")}>${data.regularPrice}.00</p>
                        {data.salePrice < data.regularPrice && <p className="font-medium">${data.salePrice}.00</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index