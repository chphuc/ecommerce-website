import { useState, useEffect } from 'react'

import { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from '../../../utils/CategoryUtils'
import { getAllBrand, getBrandById, createBrand, updateBrand, deleteBrand } from '../../../utils/BrandUtils'
import { notifySuccess, notifyError } from '../../../components/Toast'
import ProductCaregoryItem from './ProductCaregoryItem'
import EditModal from './EditModal'
import RemoveModal from './RemoveModal'


const Index = () => {
    const typeElements = {
        category: 'category',
        brand: 'brand',
    }
    const [dataElements, setDataElements] = useState({
        [typeElements.category]: [],
        [typeElements.brand]: []
    })
    const [typeElementCurrent, setTypeElementCurrent] = useState('')
    const [idElementCurrent, setIdElementCurrent] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [showRemove, setShowRemove] = useState(false)

    const handleOpenEdit = (typeElement, id) => {
        setTypeElementCurrent(typeElement)
        setIdElementCurrent(id)
        setShowEdit(true)
    }
    const handleCloseEdit = () => setShowEdit(false)

    const handleOpenRemove = (typeElement, id) => {
        setTypeElementCurrent(typeElement)
        setIdElementCurrent(id)
        setShowRemove(true)
    }
    const handleCloseRemove = () => setShowRemove(false)

    const functionGetElements = (typeElement) => {
        switch (typeElement) {
            case typeElements.category:
                return getAllCategory()
            case typeElements.brand:
                return getAllBrand()
        }
    }

    const fetchElementsByType = (typeElement) => {
        functionGetElements(typeElements[typeElement])
            .then(res => setDataElements(prev => ({
                ...prev,
                [typeElements[typeElement]]: res.data.data
            })))
    }

    const functionGetElementById = () => {
        switch (typeElementCurrent) {
            case typeElements.category:
                return getCategoryById(idElementCurrent)
            case typeElements.brand:
                return getBrandById(idElementCurrent)
        }
    }

    const functionCreateElement = (typeElement, data) => {
        switch (typeElement) {
            case typeElements.category:
                return createCategory(data)
            case typeElements.brand:
                return createBrand(data)
        }
    }

    const functionUpdateElementById = (data) => {
        switch (typeElementCurrent) {
            case typeElements.category:
                return updateCategory(idElementCurrent, data)
            case typeElements.brand:
                return updateBrand(idElementCurrent, data)
        }
    }

    const functionDeleteElementById = () => {
        switch (typeElementCurrent) {
            case typeElements.category:
                return deleteCategory(idElementCurrent)
            case typeElements.brand:
                return deleteBrand(idElementCurrent)
        }
    }

    const handleCreateElement = (typeElement, data) => {
        for (let key in data) {
            if (data[key] === '') return notifyError(`Missing ${key} value`)
        }

        functionCreateElement(typeElement, data)
            .then(res => {
                notifySuccess(res.data.message)
                fetchElementsByType(typeElement)
            })
            .catch(err => notifyError(err.response.data.message))
    }

    const handleUpdateElementById = (data) => {
        for (let key in data) {
            if (data[key] === '') return notifyError(`Missing ${key} value`)
        }

        functionUpdateElementById(data)
            .then(res => {
                handleCloseEdit()
                notifySuccess(res.data.message)
                fetchElementsByType(typeElementCurrent)
            })
            .catch(err => console.log(err))
    }

    const handleDeleteElementById = () => {
        functionDeleteElementById()
            .then(res => {
                handleCloseRemove()
                notifySuccess(res.data.message)
                fetchElementsByType(typeElementCurrent)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchElementsByType(typeElements.category)
        fetchElementsByType(typeElements.brand)
    }, [])

    return (
        <>
            {
                showEdit &&
                <EditModal
                    handleCloseEdit={handleCloseEdit}
                    typeElementCurrent={typeElementCurrent}
                    handleGetElementById={functionGetElementById}
                    handleUpdateElementById={handleUpdateElementById}
                />
            }
            {
                showRemove &&
                <RemoveModal
                    handleCloseRemove={handleCloseRemove}
                    typeElementCurrent={typeElementCurrent}
                    handleDeleteElementById={handleDeleteElementById}
                />
            }
            <div className='h-full p-2 lg:px-6 lg:py-4'>
                <div className='h-full grid grid-cols-12 gap-4'>
                    <div className='h-full col-span-12 lg:col-span-6'>
                        <ProductCaregoryItem
                            title={'Product Category'}
                            typeElement={typeElements.category}
                            dataElements={dataElements.category}
                            handleCreateElement={handleCreateElement}
                            handleOpenEdit={handleOpenEdit}
                            handleOpenRemove={handleOpenRemove}
                        />
                    </div>
                    <div className='h-full col-span-12 lg:col-span-6'>
                        <ProductCaregoryItem
                            title={'Product Brand'}
                            typeElement={typeElements.brand}
                            dataElements={dataElements.brand}
                            handleCreateElement={handleCreateElement}
                            handleOpenEdit={handleOpenEdit}
                            handleOpenRemove={handleOpenRemove}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index