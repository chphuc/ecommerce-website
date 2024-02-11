import { useState, useEffect } from 'react'
import { getUser, addAddress, setDefaultAddress, deleteAddress } from '../../utils/userUtils'
import { notifySuccess, notifyError } from '../../components/Toast'

import Modal from '../../components/Modal'
import Button from '../../components/Button'
import CreateAddress from './CreateAddress'
import noAddress from '../../assets/noaddress.jpg'

const Index = () => {
    const [user, setUser] = useState({})
    const [showCreateAddress, setShowCreateAddress] = useState(false)

    const handleOpenModalAdd = () => setShowCreateAddress(true)
    const handleCloseModalAdd = () => setShowCreateAddress(false)

    const handleFetchUser = () => {
        getUser()
            .then(res => {
                setUser(res.data.data)
            })
            .catch(err => console.log(err))
    }

    const handleCreateAddress = (data) => {
        for (let key in data) {
            if (data[key] === '') return notifyError('Missing ' + key + ' value')
        }

        addAddress({ ...data, defaultAddress: data.isDefaultAddress })
            .then(res => {
                notifySuccess(res.data.message)
                handleCloseModalAdd()
                handleFetchUser()
            })
            .catch(err => notifyError(err.response.data.message))
    }

    const handleSetDefaultAddress = (id) => {
        setDefaultAddress(id)
            .then(res => {
                handleFetchUser()
            })
            .catch(err => console.log(err))
    }

    const handleDeleteAddress = (id) => {
        deleteAddress(id)
            .then(res => {
                console.log(res)
                handleFetchUser()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        handleFetchUser()
    }, [])

    return (
        <>
            {
                showCreateAddress &&
                <Modal>
                    <CreateAddress
                        handleCloseModalAdd={handleCloseModalAdd}
                        handleCreateAddress={handleCreateAddress}
                    />
                </Modal>
            }
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                    <p className="text-xl">My Address</p>
                </div>
                <div>
                    <Button
                        title="+ Add new address"
                        onClick={handleOpenModalAdd}
                        type="success"
                        size="lg"
                    />
                </div>
            </div>
            <div className="px-6 py-5">
                {
                    user.address?.length > 0 ?
                        <>
                            <p className="text-xl">Address</p>
                            {
                                user.address.map((item, index) => (
                                    <div key={index} className="border-b py-6">
                                        <div className="flex items-center justify-between mb-1">
                                            <div>
                                                <div className="flex items-center gap-x-3">
                                                    <p>{user.firstName} {user.lastName}</p>
                                                    <p className="text-gray-500 pl-3 border-l border-gray-400">{user.phone}</p>
                                                </div>
                                                <p className="text-gray-500">{item.specificAddress}</p>
                                                <p className="text-gray-500">{item.village}, {item.district}, {item.province}</p>
                                            </div>
                                            <div className="flex flex-col gap-y-4">
                                                <button onClick={() => handleDeleteAddress(item._id)} className="text-red-500 text-right cursor-pointer">Delete</button>
                                                {
                                                    !item.defaultAddress &&
                                                    <button onClick={() => handleSetDefaultAddress(item._id)} className="border text-sm px-3 py-1">Set default</button>
                                                }
                                            </div>
                                        </div>
                                        {
                                            item.defaultAddress &&
                                            <span className="px-1 border border-red-500 text-red-500">Default</span>
                                        }
                                    </div>
                                ))
                            }
                        </>
                        :
                        <div className="flex justify-center">
                            <div>
                                <img alt='' className="w-56" src={noAddress} />
                                <p>You do not have an address.</p>
                            </div>
                        </div>
                }
            </div >
        </>
    )
}

export default Index