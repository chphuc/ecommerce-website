import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserById, updateUserById, changePassword } from '../../utils/UserUtils'
import { signOut } from '../../utils/AuthUtils'
import { notifySuccess, notifyError } from '../../components/Toast'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SuccessConfirm from '../../components/SuccessConfirm'
import ChangePassword from './ChangePassword'

const Index = () => {
    const navigate = useNavigate()
    const [dataUser, setDataUser] = useState({})
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [dataPassword, setDataPassword] = useState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    })

    const handleChangeDataPassword = e => {
        setDataPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const resetDataPassword = () => {
        setDataPassword({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
        })
    }

    const handleOpenChangePassword = () => setShowChangePassword(true)
    const handleCloseChangePassword = () => {
        setShowChangePassword(false)
        resetDataPassword()
    }

    const handleConfirmNewPassword = () => {
        for (let key in dataPassword) {
            if (dataPassword[key] === '') return notifyError('All value is required')
        }

        if (dataPassword.newPassword !== dataPassword.repeatNewPassword) return notifyError('Repeat password do not match')

        changePassword({
            currentPassword: dataPassword.currentPassword,
            newPassword: dataPassword.newPassword
        })
            .then(res => {
                handleCloseChangePassword()
                notifySuccess(res.data.message)
            })
            .catch(err => notifyError(err.response.data.message))
    }

    const handleFetchDataUser = () => {
        getUserById()
            .then(res => setDataUser(res.data.data))
            .catch(err => console.log(err))
    }

    const handleChangeDataUser = e => {
        setDataUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = e => {
        e.preventDefault()

        updateUserById(dataUser)
            .then(res => {
                handleFetchDataUser()
                notifySuccess(res.data.message)
            })
            .catch(err => console.log(err))
    }

    const handleSignOut = () => {
        signOut()
            .then(res => {
                notifyError(res.data.message)
                navigate('/signin')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        handleFetchDataUser()
    }, [])

    return (
        <>
            {
                showChangePassword &&
                <Modal>
                    <SuccessConfirm
                        title='Change Password'
                        content='Are you sure you want to change your password?'
                        onCancel={handleCloseChangePassword}
                        onConfirm={handleConfirmNewPassword}
                        children={
                            <ChangePassword
                                dataPassword={dataPassword}
                                handleChangeDataPassword={handleChangeDataPassword}
                            />
                        }
                    />
                </Modal>
            }
            {
                Object.keys(dataUser).length ?
                    <div className='flex flex-col gap-4 p-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='p-4 border shadow-md rounded-md'>
                                <div className='flex flex-col items-center gap-4'>
                                    <img
                                        alt=''
                                        src='https://cannamazoo.com/assets/defaults/img/default-product-img.jpg'
                                        className='w-20 rounded-full'
                                    />
                                    <p className='text-lg font-bold'>{dataUser.userName}</p>
                                    <p className='px-6 py-1 text-xs text-white font-bold uppercase bg-green-500 rounded-md'>{dataUser.role}</p>
                                    <div>
                                        <Button
                                            title='Sign out'
                                            type='danger'
                                            onClick={handleSignOut}
                                            optionStyle='w-full'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleUpdate} className='flex flex-col gap-4 p-4 border shadow-md rounded-md'>
                            <p className='font-medium'>My Profile Details</p>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-gray-300'>Email</p>
                                <Input
                                    type='text'
                                    name='email'
                                    value={dataUser.email || ''}
                                    disabled
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-gray-300'>User Name</p>
                                <Input
                                    type='text'
                                    name='userName'
                                    value={dataUser.userName || ''}
                                    disabled
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-gray-300'>First Name</p>
                                <Input
                                    type='text'
                                    name='firstName'
                                    value={dataUser.firstName || ''}
                                    onChange={handleChangeDataUser}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-gray-300'>Last Name</p>
                                <Input
                                    type='text'
                                    name='lastName'
                                    value={dataUser.lastName || ''}
                                    onChange={handleChangeDataUser}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-gray-300'>Phone</p>
                                <Input
                                    type='number'
                                    name='phone'
                                    value={dataUser.phone || ''}
                                    onChange={handleChangeDataUser}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs text-gray-300'>Password</p>
                                <Input
                                    type='password'
                                    name='password'
                                    value='------'
                                    disabled
                                />
                                <div className='flex'>
                                    <button
                                        onClick={handleOpenChangePassword}
                                        type='button'
                                        className='text-xs font-bold text-blue-500 underline active:text-blue-400'
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <Button
                                    title='Update Infomation'
                                    type='success'
                                    onClick={handleUpdate}
                                />
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        Loadding...
                    </div>
            }
        </>
    )
}

export default Index