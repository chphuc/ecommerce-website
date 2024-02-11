import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { getAllProduct } from '../../utils/productUtils'
import ProductsFilter from './ProductsFilter'
import ProductItem from '../../components/ProductItem'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import OutsideAlerter from '../../components/OutsideAlerter';

import { BiChevronRight } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";

const Index = () => {
    const location = useLocation()
    const [dataOriginalProducts, setDataOriginalProducts] = useState([])
    const [dataProducts, setDataProducts] = useState([])
    const [filter, setFilter] = useState({
        category: location.state?.category ? [location.state?.category] : [],
        brand: []
    })
    const dataColumn = [
        {
            title: "3 columns",
            value: 3,
            svg: <svg className="w-[12px] h-[12px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.5 12.5"><defs></defs><defs><style>.cls-1</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="Group-16"><path id="Rectangle" d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z" className="cls-1"></path><path id="Rectangle-2" d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z" className="cls-1" data-name="Rectangle"></path><path id="Rectangle-3" d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z" className="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
        },
        {
            title: "5 columns",
            value: 5,
            svg: <svg className="w-[15px] h-[15px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 12.5"><defs></defs><defs><style>.cls-1</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="_5_col" data-name="5_col"><path id="Rectangle" d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z" className="cls-1"></path><path id="Rectangle-2" d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z" className="cls-1" data-name="Rectangle"></path><path id="Rectangle-3" d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z" className="cls-1" data-name="Rectangle"></path><path id="Rectangle-4" d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z" className="cls-1" data-name="Rectangle"></path><path id="Rectangle-5" d="M16.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z" className="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
        }
    ]
    const [columnLayout, setColumnLayout] = useState(dataColumn[1].value)
    const [curItems, setCurItems] = useState(10)
    const [isMobile, setIsMobile] = useState(false)
    const [isShowFilter, setIsShowFilter] = useState(false)
    const [filterStyle, setFilterStyle] = useState("-translate-x-full")

    const handleOpenFilter = () => {
        setIsShowFilter(true)
        setTimeout(() => {
            setFilterStyle("")
        }, 0)
    }
    const handleCloseFilter = () => {
        setFilterStyle("-translate-x-full")
        setTimeout(() => {
            setIsShowFilter(false)
        }, 300)
    }

    const handleClickLoadMore = () => {
        setCurItems((prev) => (prev + 10 > dataProducts.length ? dataProducts.length : prev + 10))
    }

    const handleChangeFilter = e => {
        if (e.target.checked) {
            setFilter((prev) => ({
                ...prev,
                [e.target.name]: [...prev[e.target.name], e.target.value]
            }))
        } else {
            setFilter((prev) => ({
                ...prev,
                [e.target.name]: [...prev[e.target.name].filter(item => item !== e.target.value)]
            }))
        }
    }

    const getCheckedInput = (name, value) => {
        return filter[name].includes(value)
    }

    useEffect(() => {
        getAllProduct()
            .then(res => {
                setDataOriginalProducts(res.data.data)
                setDataProducts(res.data.data.filter(product => {
                    for (let key in filter) {
                        if (filter[key].length) {
                            if (!filter[key].includes(product[key])) return false
                        }
                    }
                    return true
                }))
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setDataProducts(dataOriginalProducts.filter(product => {
            for (let key in filter) {
                if (filter[key].length) {
                    if (!filter[key].includes(product[key])) return false
                }
            }
            return true
        }))
    }, [filter])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Call handleResize initially
        handleResize();

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="px-4 lg:px-12 pb-24">
            <div className="py-10">
                <h1 className="text-center text-[40px]">Products</h1>
                <div className="flex items-center justify-center py-4">
                    <Link to="/">
                        <p className="hover:text-gray-400 transition duration-200">Home</p>
                    </Link>
                    <p className="mx-3"> <BiChevronRight /> </p>
                    <p>Products</p>
                </div>
            </div>
            <div className="flex gap-4">
                {
                    isMobile ?
                        (
                            isShowFilter &&
                            <Modal>
                                <div className="w-full h-full flex">
                                    <OutsideAlerter
                                        todo={handleCloseFilter}
                                        compStyle={"w-2/5 bg-white p-4 transition duration-300 " + filterStyle}
                                    >
                                        <ProductsFilter
                                            handleChangeFilter={handleChangeFilter}
                                            getCheckedInput={getCheckedInput}
                                        />
                                    </OutsideAlerter>
                                </div>
                            </Modal>
                        ) :
                        (
                            <div className='w-1/5'>
                                <ProductsFilter
                                    handleChangeFilter={handleChangeFilter}
                                    getCheckedInput={getCheckedInput}
                                />
                            </div>
                        )
                }
                <div className="flex-1">
                    <div className="flex items-center justify-end pb-4">
                        <div className="lg:hidden">
                            <Button
                                title="Filter"
                                size="sm"
                                type="outline"
                                onClick={handleOpenFilter}
                                children={<MdFilterList className='text-lg' />}
                                optionStyle='flex items-center gap-2'
                            />
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            {
                                dataColumn.map(item => (
                                    <Tippy key={item.title} content={item.title} placement="top">
                                        <button onClick={() => setColumnLayout(item.value)} className={"flex items-center justify-center w-8 h-8 rounded hover:bg-black hover:text-white transition duration-300 " + (columnLayout === item.value ? "bg-black text-white" : "bg-gray-200")}>
                                            {item.svg}
                                        </button>
                                    </Tippy>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`grid grid-cols-2 lg:grid-cols-${columnLayout} gap-x-6 gap-y-9`}>
                        {
                            dataProducts.length > 0 &&
                            dataProducts.map((product, index) => (
                                index < curItems && <ProductItem key={index} data={product} />
                            ))
                        }
                    </div>
                    <div className="mt-12 flex justify-center">
                        {
                            curItems < dataProducts.length &&
                            <>
                                <button onClick={handleClickLoadMore} className="w-full lg:w-auto py-2 px-7 font-medium border border-black rounded hover:text-white hover:bg-black hover:scale-110 transition duration-300">
                                    Load More
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Index
