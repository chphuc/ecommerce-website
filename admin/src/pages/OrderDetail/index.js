import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import SumaryItem from './SumaryItem'
import ProductItem from './ProductItem'
import Modal from '../../components/Modal'
import SuccessConfirm from '../../components/SuccessConfirm'
import DangerConfirm from '../../components/DangerConfirm'
import { notifySuccess, notifyError } from '../../components/Toast'

import { getUserOrderById, confirmOrder, declineOrder } from '../../utils/OrderUtils'
import { getUserById } from '../../utils/UserUtils'

const Index = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [dataOrder, setDataOrder] = useState({})
    const [dataUser, setDataUser] = useState({})
    const [limitProduct, setLimitProduct] = useState(2)
    const [declineReason, setDeclineReason] = useState("")
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showDeclineModal, setShowDeclineModal] = useState(false)

    const handleClickBack = () => {
        navigate(-1)
    }

    const handleLoadMore = () => {
        setLimitProduct(dataOrder.products.length)
    }

    const handleClickConfirmButton = () => setShowConfirmModal(true)
    const handleCloseConfirmModal = () => setShowConfirmModal(false)

    const handleClickDeclineButton = () => setShowDeclineModal(true)
    const handleCloseDeclineModal = () => setShowDeclineModal(false)

    const handleChangeDeclineReason = e => {
        setDeclineReason(e.target.value)
    }

    const handleConfirmOrder = () => {
        confirmOrder(dataOrder._id)
            .then(res => {
                notifySuccess(res.data.message)
                handleCloseConfirmModal()
                fetchData()
            })
            .catch(err => console.log(err))
    }

    const handleDeclineOrder = () => {
        if (!declineReason.length) return notifyError("Reason decline is required")

        declineOrder(dataOrder._id, declineReason)
            .then(res => {
                notifySuccess(res.data.message)
                handleCloseDeclineModal()
                fetchData()
            })
            .catch(err => console.log(err))
    }

    const fetchData = () => {
        getUserOrderById(id)
            .then(res => {
                setDataOrder(res.data.data)
                getUserById(res.data.data.userId)
                    .then(res => setDataUser(res.data.data))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {
                showConfirmModal &&
                <Modal>
                    <SuccessConfirm
                        title='Confirm Order'
                        content='Are you sure you want to confirm this order?'
                        onCancel={handleCloseConfirmModal}
                        onConfirm={handleConfirmOrder}
                    />
                </Modal>
            }
            {
                showDeclineModal &&
                <Modal>
                    <DangerConfirm
                        title='Decline Order'
                        content='Are you sure you want to decline this order?'
                        titleConfirm="Decline"
                        onCancel={handleCloseDeclineModal}
                        onConfirm={handleDeclineOrder}
                        children={
                            <div className='flex flex-col gap-y-2 px-4'>
                                <p>Reason Decline</p>
                                <Textarea
                                    rows="2"
                                    value={declineReason}
                                    onChange={handleChangeDeclineReason}
                                />
                            </div>
                        }
                    />
                </Modal>
            }
            {
                dataOrder.products ?
                    <div className='flex flex-col gap-y-4 p-2 lg:px-6 lg:py-4'>
                        <div>
                            <Button
                                title='Return'
                                type='none'
                                size='none'
                                onClick={handleClickBack}
                                optionStyle='px-0 text-sm text-blue-500 font-medium underline active:text-blue-400 shadow-none'
                            />
                        </div>
                        {
                            dataOrder.status === 'pending' ?
                                <div className='flex items-center justify-end gap-x-4'>
                                    <Button
                                        type='success'
                                        size='md'
                                        title='Confirm'
                                        onClick={handleClickConfirmButton}
                                    />
                                    <Button
                                        type='danger'
                                        size='md'
                                        title='Decline'
                                        onClick={handleClickDeclineButton}
                                    />
                                </div>
                                :
                                dataOrder.status === 'confirm' ?
                                    <div className='flex justify-end'>
                                        <span className="uppercase rounded-md bg-green-100 px-4 pt-1.5 pb-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            Confirm
                                        </span>
                                    </div>
                                    :
                                    <div>
                                        <div className='flex justify-end'>
                                            <span className="uppercase rounded-md bg-red-100 px-4 pt-1.5 pb-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                Decline
                                            </span>
                                        </div>
                                        <p className='font-medium'>Reason Decline</p>
                                        <Textarea
                                            rows="2"
                                            disabled
                                            value={dataOrder.declineReason}
                                            onChange={handleChangeDeclineReason}
                                        />
                                    </div>
                        }
                        <div className='flex flex-wrap items-center gap-x-4 gap-y-4'>
                            <div className='basis-full lg:flex-1'>
                                <SumaryItem
                                    title='Customer Details'
                                    children={[
                                        {
                                            title: 'Fullname',
                                            value: dataUser.firstName + ' ' + dataUser.lastName
                                        },
                                        {
                                            title: 'Email',
                                            value: dataUser.email
                                        },
                                        {
                                            title: 'Phone',
                                            value: dataUser.phone
                                        },
                                    ]}
                                />
                            </div>
                            <div className='basis-full lg:flex-1'>
                                <SumaryItem
                                    title='Order Details'
                                    children={[
                                        {
                                            title: 'Subtotal',
                                            value: dataOrder.total
                                        },
                                        {
                                            title: 'Transport fee',
                                            value: dataOrder.shippingFee
                                        },
                                        {
                                            title: 'Final total',
                                            value: dataOrder.total + dataOrder.shippingFee
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div>
                            <SumaryItem
                                title='Shipping Address'
                                children={[
                                    {
                                        title: 'Specific Address',
                                        value: dataOrder.address
                                    },
                                    {
                                        title: 'Note',
                                        value: dataOrder.note || '-'
                                    },
                                ]}
                            />
                        </div>
                        <div className='flex flex-col gap-y-4 p-4 border shadow-md rounded-md'>
                            <p className='text-xl font-medium'>Products</p>
                            <div className='flex flex-col gap-y-4'>
                                {
                                    dataOrder.products.map((product, index) => index < limitProduct && (
                                        <ProductItem key={product._id} data={product} />
                                    ))
                                }
                            </div>
                            {
                                limitProduct < dataOrder.products.length &&
                                <div className='flex justify-center'>
                                    <Button
                                        title='Load More'
                                        type='none'
                                        onClick={handleLoadMore}
                                        optionStyle='text-blue-500 font-medium underline active:text-blue-400 shadow-none'
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <div>
                        Loading...
                    </div>
            }
        </>
    )
}

export default Index