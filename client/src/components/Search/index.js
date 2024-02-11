import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { closeSearchModal } from '../../features/searchModal/searchModalSlice'

import { searchProduct } from '../../utils/productUtils'
import Modal from '../Modal'
import OutsideAlerter from '../OutsideAlerter'
import ProductItem from '../ProductItem'

import { IoMdClose } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
    const dispatch = useDispatch()

    const [dataProduct, setDataProduct] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const [searchStyle, setSearchStyle] = useState("-translate-y-full")

    const handleCloseCartModal = () => {
        setSearchStyle("-translate-y-full")

        setTimeout(() => {
            dispatch(closeSearchModal())
        }, 300)
    }

    useEffect(() => {
        setSearchStyle("translate-y-0")
    }, [])

    const handleMoveDetailProductPage = () => {
        setInputSearch("")
        dispatch(closeSearchModal())
    }

    useEffect(() => {
        if (!inputSearch) return

        const handleSearchProduct = setTimeout(() => {
            searchProduct(inputSearch)
                .then(res => setDataProduct(res.data.data))
                .catch(err => console.log(err))
        }, 350)

        return () => clearTimeout(handleSearchProduct)

    }, [inputSearch])

    return (
        <Modal>
            <OutsideAlerter todo={handleCloseCartModal} compStyle={"absolute top-0 left-0 flex flex-col gap-4 w-full h-screen lg:h-auto bg-white p-4 transition duration-300 " + searchStyle}>
                <div className="flex items-center justify-between md:hidden">
                    <h3 className="font-medium">Search our store</h3>
                    <button className="text-black p-2 text-xl" onClick={handleCloseCartModal}>
                        <IoMdClose />
                    </button>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full lg:w-1/3 border border-black rounded">
                        <input
                            type="text"
                            className="w-full outline-none px-3 py-2"
                            placeholder="Search products"
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                        />
                        <button className="absolute top-1 right-0 text-xl p-2">
                            <BiSearch />
                        </button>
                    </div>
                </div>
                {
                    !inputSearch
                        ?
                        <div className="flex md:justify-center flex-wrap">
                            <span className="text-[#666] mr-4">Popular Searches:</span>
                            <div className="flex items-center flex-wrap">
                                <a hred="#" className="cursor-pointer underline mr-4 hover:text-gray-800 whitespace-nowrap">T-Shirt</a>
                                <a hred="#" className="cursor-pointer underline mr-4 hover:text-gray-800 whitespace-nowrap">Blue</a>
                                <a hred="#" className="cursor-pointer underline mr-4 hover:text-gray-800 whitespace-nowrap">Jacket</a>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col gap-4'>
                            <p className="text-center text-2xl text-slate-400">Results for "<span className="text-black">{inputSearch}</span>"</p>
                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 overflow-y-scroll no-scroll" style={{ maxHeight: '575px' }}>
                                {
                                    dataProduct.map(item => (
                                        <div key={item._id} onClick={handleMoveDetailProductPage}>
                                            <ProductItem data={item} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
            </OutsideAlerter>
        </Modal>
    )
}

export default Search