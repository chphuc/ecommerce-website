import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { openCartModal } from '../../../features/cartModal/cartModalSlice'
import { openSearchModal } from '../../../features/searchModal/searchModalSlice'

import { route } from '../../../routes'
import AnnouncementBar from './AnnouncementBar'
import Navigation from './Navigation'
import Search from '../../../components/Search'
import Cart from '../../../components/Cart'

import { BiSearch } from 'react-icons/bi'
import { FiUser } from 'react-icons/fi'
import { RiShoppingBagLine } from 'react-icons/ri'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartRedux = useSelector(state => state.cart.cart)
    const showCartModal = useSelector(state => state.cartModal.isOpen)
    const showSearchModal = useSelector(state => state.searchModal.isOpen)

    const handleOpenSearch = () => dispatch(openSearchModal())

    const handleOpenCart = () => dispatch(openCartModal())

    const handleClickAcount = () => {
        navigate(route.accountInfomation)
    }

    return (
        <>
            {
                showSearchModal && <Search />
            }
            {
                showCartModal && <Cart />
            }
            <AnnouncementBar />
            <div className="flex items-center px-4 lg:px-12 py-3 shadow">
                <div className="flex-1 flex items-center">
                    <Navigation />
                </div>
                <div className="w-36">
                    <a href="/">
                        <img alt="logo" src="https://cdn.shopify.com/s/files/1/0591/1350/4958/files/3.png?v=1628328728&width=360" />
                    </a>
                </div>
                <div className="flex-1 flex items-center justify-end gap-2 lg:gap-6">
                    <Tippy content="Search">
                        <button className="" onClick={handleOpenSearch}>
                            <BiSearch className="text-xl" />
                        </button>
                    </Tippy>
                    <Tippy content="Cart">
                        <button className="relative" onClick={handleOpenCart}>
                            <RiShoppingBagLine className="text-xl" />
                            <span className="w-5 h-5 absolute -top-2 -right-3 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full border-1 border-white">
                                {cartRedux.length}
                            </span>
                        </button>
                    </Tippy>
                    <Tippy content="Account">
                        <button onClick={handleClickAcount}>
                            <FiUser className="text-xl" />
                        </button>
                    </Tippy>
                </div>
            </div >
        </>
    )
}

export default Header