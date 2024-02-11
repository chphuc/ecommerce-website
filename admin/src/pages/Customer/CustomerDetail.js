import { useState, useEffect } from 'react'

import CustomerDetailOverview from './CustomerDetailOverview'
import CustomerDetailActivity from './CustomerDetailActivity'

import { getUserByAdmin, updateUserByAdmin } from '../../utils/UserUtils'
import { getUserOrders } from '../../utils/OrderUtils'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { notifySuccess, notifyError } from '../../components/Toast'

const CustomerDetail = ({ currentCustomer, handleCloseDetail }) => {
    const [dataUser, setDataUser] = useState({})
    const [dataUserOrder, setDataUserOrder] = useState([])
    const dataUserDisabled = ['email', 'userName']
    const tabs = [
        {
            title: 'Overview',
            children: CustomerDetailOverview,
            props: {
                dataUserOrder
            }
        },
        {
            title: 'Activity',
            children: CustomerDetailActivity,
            props: {
                dataUserOrder
            }
        }
    ]
    const [currentTab, setCurrentTab] = useState(0)

    const handleRenderTabContent = () => {
        const Comp = tabs[currentTab].children
        return <Comp props={tabs[currentTab].props} />
    }

    const handleOnChangeDataUser = e => {
        if (dataUserDisabled.includes(e.target.name)) return

        setDataUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleUpdateUser = e => {
        e.preventDefault()

        if (!dataUser.firstName || !dataUser.lastName || !dataUser.phone) return notifyError('All fields are required')

        updateUserByAdmin(dataUser._id, {
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            phone: dataUser.phone,
        })
            .then(res => {
                notifySuccess(res.data.message)
                handleCloseDetail()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserByAdmin(currentCustomer)
            .then(res => setDataUser(res.data.data))
            .catch(err => console.log(err))
    }, [currentCustomer])

    useEffect(() => {
        getUserOrders(currentCustomer)
            .then(res => setDataUserOrder(res.data.data))
            .catch(err => console.log(err))
    }, [currentCustomer])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-4'>
                <p className='text-xl font-medium'>Customer Details</p>
                {
                    dataUser.email ?
                        <form onSubmit={handleUpdateUser} className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-medium'>Email</p>
                                <Input
                                    type='text'
                                    name='email'
                                    disabled
                                    value={dataUser.email}
                                    onChange={handleOnChangeDataUser}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-medium'>Username</p>
                                <Input
                                    type='text'
                                    name='userName'
                                    disabled
                                    value={dataUser.userName}
                                    onChange={handleOnChangeDataUser}
                                />
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='flex-1 flex flex-col gap-2'>
                                    <p className='font-medium'>First Name</p>
                                    <Input
                                        type='text'
                                        name='firstName'
                                        value={dataUser.firstName}
                                        onChange={handleOnChangeDataUser}
                                    />
                                </div>
                                <div className='flex-1 flex flex-col gap-2'>
                                    <p className='font-medium'>Last Name</p>
                                    <Input
                                        type='text'
                                        name='lastName'
                                        value={dataUser.lastName}
                                        onChange={handleOnChangeDataUser}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-medium'>Phone</p>
                                <Input
                                    type='number'
                                    name='phone'
                                    value={dataUser.phone}
                                    onChange={handleOnChangeDataUser}
                                />
                            </div>
                            <div className='flex justify-end'>
                                <Button
                                    title='Update'
                                    type='success'
                                    onClick={handleUpdateUser}
                                />
                            </div>
                        </form>
                        :
                        <div>
                            Loadding...
                        </div>
                }
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                    {
                        tabs.map((tab, index) => (
                            <Button
                                key={tab.title}
                                title={tab.title}
                                size='sm'
                                type='outline'
                                optionStyle={' ' + (index === currentTab ? 'bg-black text-white' : '')}
                                onClick={() => setCurrentTab(index)}
                            />
                        ))
                    }
                </div>
                <div>
                    {
                        handleRenderTabContent()
                    }
                </div>
            </div>
        </div >
    )
}

export default CustomerDetail