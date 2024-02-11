import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { getProductById, updateProduct, createProduct } from '../../../utils/ProductUtils'
import { getAllBrand } from '../../../utils/BrandUtils'
import { getAllCategory } from '../../../utils/CategoryUtils'
import { notifySuccess, notifyError } from '../../../components/Toast'
import imageDefault from '../../../assets/image-default.png'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import SelectComponent from '../../../components/Select'

import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'

const NewProduct = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const initInput = {
        name: '',
        description: '',
        images: [
            {
                value: ''
            },
            {
                value: ''
            }
        ],
        category: '',
        brand: '',
        regularPrice: '',
        salePrice: '',
        quantity: 0
    }
    const [input, setInput] = useState(initInput)
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])

    const decreaseImages = () => {
        setInput((prev) => {
            if (prev.images.length <= 2) return prev

            return {
                ...prev,
                images: prev.images.slice(0, prev.images.length - 1)
            }
        })
    }

    const increaseImages = () => {
        setInput((prev) => ({
            ...prev,
            images: [...prev.images, { value: '' }]
        }))
    }

    const handleChangeInput = (e) => {
        // check input image ?
        if (e.target.id) {
            setInput((prev) => ({
                ...prev,
                images: prev.images.map((image, index) => (+e.target.id === index ? { value: e.target.value } : image))
            }))
        }
        // change input text
        else {
            setInput((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleClearInput = () => setInput(initInput)

    const handleSubmit = (e) => {
        e.preventDefault()

        for (const image of input.images) {
            if (image.value === '') {
                notifyError('Missing Images')
                return
            }
        }

        for (const key in input) {
            if (input[key] === '' && key !== 'salePrice') {
                notifyError('Missing ' + key + ' Value')
                return
            }
        }

        if (state?.id) {
            updateProduct(state.id, {
                name: input.name,
                description: input.description,
                images: input.images.map(item => item.value),
                category: input.category,
                brand: input.brand,
                regularPrice: input.regularPrice,
                salePrice: input.salePrice || input.regularPrice,
                quantity: input.quantity
            })
                .then(res => {
                    notifySuccess(res.data.message)
                    navigate('/products/management')
                })
                .catch(err => notifyError(err.response.data.message))
        }
        else {
            createProduct({
                name: input.name,
                description: input.description,
                images: input.images.map(item => item.value),
                category: input.category,
                brand: input.brand,
                regularPrice: input.regularPrice,
                salePrice: input.salePrice || input.regularPrice,
                quantity: input.quantity
            })
                .then(res => {
                    notifySuccess(res.data.message)
                    handleClearInput()
                })
                .catch(err => notifyError(err.response.data.message))
        }

    }

    useEffect(() => {
        getAllCategory()
            .then(res => setCategoryList(res.data.data.map(item => ({ ...item, value: item.name }))))
            .catch(err => console.log(err))
        getAllBrand()
            .then(res => setBrandList(res.data.data.map(item => ({ ...item, value: item.name }))))
            .catch(err => console.log(err))
    }, [])

    // Fetch product data when navigation from edit link
    useEffect(() => {
        if (categoryList.length && brandList.length) {
            if (state?.id) {
                getProductById(state.id)
                    .then(res => {
                        const data = res.data.data
                        setInput({
                            name: data.name,
                            description: data.description,
                            images: data.images.map((item) => ({ value: item })),
                            category: data.category || categoryList[0].value,
                            brand: data.brand || brandList[0].value,
                            regularPrice: data.regularPrice,
                            salePrice: data.salePrice,
                            quantity: data.quantity
                        })
                    })
                    .catch(err => console.log(err))
            }
            else {
                setInput((prev) => ({
                    ...prev,
                    category: categoryList[0].value,
                    brand: brandList[0].value,
                }))
            }
        }
    }, [categoryList, brandList])

    return (
        <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between p-2 lg:px-6 lg:py-4'>
            <div className='flex flex-col lg:flex-row gap-x-4 gap-y-4'>
                <div className='w-full lg:w-7/12'>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label className='mb-2 text-sm font-medium text-gray-500'>Product Images [2+]</label>
                            <div className='flex items-center gap-x-3'>
                                <button type='button' onClick={decreaseImages}><AiOutlineMinus /></button>
                                <button type='button' onClick={increaseImages}><AiOutlinePlus /></button>
                            </div>
                        </div>
                        <div className='grid grid-cols-5 gap-x-2 mt-2'>
                            <div className='col-span-2 rounded-md overflow-hidden'>
                                <img alt='' src={input.images[0].value || imageDefault} />
                            </div>
                            <div className='col-span-2 rounded-md overflow-hidden'>
                                <img alt='' src={input.images[1].value || imageDefault} />
                            </div>
                            <div className='col-span-1 flex flex-col gap-y-2'>
                                <img alt='' className='rounded-md overflow-hidden' src={input.images[2]?.value || imageDefault} />
                                <img alt='' className='rounded-md overflow-hidden' src={input.images[3]?.value || imageDefault} />
                            </div>
                        </div>
                    </div>
                    {
                        input.images.map((item, index) => (
                            <div key={index} className='my-2'>
                                <label className='block mb-2 text-sm font-medium text-gray-500'>Link Image {index + 1}</label>
                                <Input
                                    id={index}
                                    type='text'
                                    name='image'
                                    value={item.value}
                                    onChange={handleChangeInput}
                                />
                            </div>
                        ))
                    }
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-500'>Description</label>
                        <textarea name='description' value={input.description} onChange={handleChangeInput} rows='5' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'></textarea>
                    </div>
                </div>
                <div className='w-full lg:w-5/12'>
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-500'>Product Name</label>
                        <Input
                            name='name'
                            value={input.name}
                            onChange={handleChangeInput}
                            type='text'
                        />
                    </div>
                    <div className='flex items-center justify-between gap-x-5 mt-2'>
                        <div className='flex-1'>
                            <label className='block mb-2 text-sm font-medium text-gray-500'>Category</label>
                            <SelectComponent name='category' title='Category' valueCurrent={input.category || categoryList[0]?.value} value={categoryList} onChange={handleChangeInput} />
                        </div>
                        <div className='flex-1'>
                            <label className='block mb-2 text-sm font-medium text-gray-500'>Brand Name</label>
                            <SelectComponent name='brand' title='Brand' valueCurrent={input.brand || brandList[0]?.value} value={brandList} onChange={handleChangeInput} />
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-x-5 mt-2'>
                        <div className='flex-1'>
                            <label className='block mb-2 text-sm font-medium text-gray-500'>Regular Price</label>
                            <Input
                                name='regularPrice'
                                value={input.regularPrice}
                                onChange={handleChangeInput}
                                type='number'
                            />
                        </div>
                        <div className='flex-1'>
                            <label className='block mb-2 text-sm font-medium text-gray-500'>Sale Price (Optional)</label>
                            <Input
                                name='salePrice'
                                value={input.salePrice}
                                onChange={handleChangeInput}
                                type='number'
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-x-5 mt-2'>
                        <div className='flex-1'>
                            <label className='block mb-2 text-sm font-medium text-gray-500'>Quantity in stock</label>
                            <Input
                                type='number'
                                name='quantity'
                                value={input.quantity}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-2'>
                <Button
                    size='lg'
                    title={state?.id ? 'Update Product' : 'Create Product'}
                    onClick={handleSubmit}
                />
            </div>
            <div className='p-1'></div>
        </form>
    )
}

export default NewProduct