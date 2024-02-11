import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'

import { getAllProduct, deleteProduct } from '../../../utils/ProductUtils'
import { getAllBrand } from '../../../utils/BrandUtils'
import { getAllCategory } from '../../../utils/CategoryUtils'
import { notifySuccess } from '../../../components/Toast'
import Button from '../../../components/Button'
import SearchComponent from '../../../components/Search'
import CheckBoxComponent from '../../../components/CheckBox'
import ProductManagementTable from './ProductManagementTable'
import Modal from '../../../components/Modal'
import DangerConfirm from '../../../components/DangerConfirm'
import Pagination from '../../../components/Pagination'

import { FiFilter } from "react-icons/fi";

const Index = () => {
    const navigate = useNavigate();
    const [originalData, setOriginalData] = useState([])
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [filters, setFilters] = useState({
        category: [],
        brand: []
    })
    const [search, setSearch] = useState('')
    const limit = 10
    const [page, setPage] = useState(1)
    const [showFilter, setShowFilter] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currentProductId, setCurrentProductId] = useState('')

    const handleCloseDeleteModal = () => setShowDeleteModal(false)

    const handleDeleteProduct = () => {
        deleteProduct(currentProductId)
            .then(res => {
                // Update data after delete request
                getAllProduct()
                    .then(res => {
                        notifySuccess(res.data.message)
                        setOriginalData(res.data.data)
                        setData(res.data.data)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        handleCloseDeleteModal()
    }

    const handleClickEditProduct = (id) => {
        navigate('/products/add', {
            state: { id }
        })
    }

    const handleClickRemoveProduct = (id) => {
        setCurrentProductId(id)
        setShowDeleteModal(true)
    }

    const handleChangeSearch = e => {
        setSearch(e.target.value)
    }

    const handleChangeCheckBox = e => {
        if (e.target.checked) {
            setFilters((prev) => ({
                ...prev,
                [e.target.name]: [...prev[e.target.name], e.target.value]
            }))
        }
        else {
            setFilters((prev) => ({
                ...prev,
                [e.target.name]: [...prev[e.target.name].filter(item => item !== e.target.value)]
            }))
        }
    }

    const getCurrentProductPage = () => {
        return data.length <= limit ? data : data.slice((page - 1) * limit, page * limit)
    }

    const handleChangePage = (page) => {
        setPage(page)
    }

    const getStateCheckBox = (name, value) => {
        return filters[name].includes(value)
    }

    const handleClearFilters = () => {
        setFilters({
            category: [],
            brand: []
        })
    }

    useEffect(() => {
        getAllProduct()
            .then(res => {
                setOriginalData(res.data.data)
                setData(res.data.data)
            })
            .catch(err => console.log(err))
        getAllBrand()
            .then(res => setCategory(res.data.data))
            .catch(err => console.log(err))
        getAllCategory()
            .then(res => setBrand(res.data.data))
            .catch(err => console.log(err))
    }, [])

    // update data when filter, search change
    useEffect(() => {
        setData((prev) => {
            const newData = originalData.filter(item => {
                if (!item.name.includes(search)) return false
                for (const key in filters) {
                    if (filters[key].length) {
                        if (!filters[key].includes(item[key])) return false
                    }
                }
                return true
            })
            return newData
        })
        setPage(1)
    }, [filters, search])

    return (
        <>
            {
                showDeleteModal &&
                <Modal>
                    <DangerConfirm
                        title='Delete Product'
                        content='Are you sure you want to delete this product?'
                        titleConfirm="Delete"
                        onCancel={handleCloseDeleteModal}
                        onConfirm={handleDeleteProduct}
                    />
                </Modal>
            }
            <div className='h-full flex flex-col justify-between p-2 lg:px-6 lg:py-4'>
                <div className='flex-1 overflow-y-scroll no-scrollbar'>
                    <div className='flex flex-wrap-reverse items-center justify-between mb-2 gap-y-2'>
                        <p>View Product: <span className='font-medium'>{getCurrentProductPage().length}</span>/{data.length}</p>
                        <div className='flex basis-full lg:basis-auto items-center justify-between gap-x-4 mt-2 lg:mt-0'>
                            <div className='flex-1'>
                                <SearchComponent title='Search Product' value={search} onChange={handleChangeSearch} />
                            </div>
                            <Tippy
                                interactive={true}
                                visible={showFilter}
                                placement='bottom-end'
                                onClickOutside={() => setShowFilter(false)}
                                render={() => (
                                    <div className='px-4 py-3 border rounded bg-white shadow' style={{ minWidth: '200px' }}>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-medium'>Filters</p>
                                            <Button
                                                title='Clear All'
                                                type='none'
                                                size='sm'
                                                onClick={handleClearFilters}
                                                optionStyle='px-0 text-sm text-blue-700 underline active:text-blue-500 shadow-none'
                                            />
                                        </div>
                                        <div className='mt-2 overflow-y-scroll no-scrollbar' style={{ maxHeight: '300px' }}>
                                            <div>
                                                <p className='mb-2'>Category</p>
                                                {
                                                    category.map((item, index) => (
                                                        <CheckBoxComponent key={index} name='category' value={item.name} checked={getStateCheckBox('category', item.name)} onChange={handleChangeCheckBox} />
                                                    ))
                                                }
                                            </div>
                                            <div>
                                                <p className='mb-2'>Brand</p>
                                                {
                                                    brand.map((item, index) => (
                                                        <CheckBoxComponent key={index} name='brand' value={item.name} checked={getStateCheckBox('brand', item.name)} onChange={handleChangeCheckBox} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            >
                                <button onClick={() => setShowFilter((prev) => (!prev))} className='flex items-center gap-x-2 px-3 py-1 border border-gray-300 rounded-md'>
                                    <p>Filter</p>
                                    <FiFilter />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    <ProductManagementTable
                        data={getCurrentProductPage()}
                        handleClickEditProduct={handleClickEditProduct}
                        handleClickRemoveProduct={handleClickRemoveProduct}
                    />
                </div >
                <div className='flex justify-end mt-4'>
                    {
                        data.length > limit &&
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(data.length / limit)}
                            handleClick={handleChangePage}
                        />
                    }
                </div>
            </div >
        </>
    )
}

export default Index