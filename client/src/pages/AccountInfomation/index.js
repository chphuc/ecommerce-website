import { useState, useEffect } from 'react'

import { getUser, updateUser } from '../../utils/userUtils'
import { notifySuccess, notifyError } from '../../components/Toast'

import Avatar from '../../assets/avatar.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Index = () => {
    const [user, setUser] = useState({})

    const handleFetchUser = () => {
        getUser()
            .then(res => setUser(res.data.data))
            .catch(err => console.error(err))
    }

    const onChangeData = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = (e) => {
        e.preventDefault()

        if (!user.firstName || !user.lastName || !user.phone) return notifyError('All fields are required')

        updateUser(user)
            .then(res => {
                notifySuccess(res.data.message)
                handleFetchUser()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        handleFetchUser()
    }, [])

    return (
        <>
            <div className="border-b px-6 py-4">
                <p className="text-xl">My profile</p>
                <p className="text-gray-600">Manage profile information for account security</p>
            </div>
            {
                user.userName &&
                <div className="flex flex-wrap-reverse p-4 lg:px-16 lg:py-5 gap-x-10 gap-y-4">
                    <form onSubmit={handleSave} className="flex-1 flex flex-col gap-y-4">
                        <div>
                            <label className="w-1/5 text-gray-700 text-sm font-bold">
                                Username
                            </label>
                            <Input
                                type="text"
                                value={user.userName}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="w-1/5 text-gray-700 text-sm font-bold">
                                Email
                            </label>
                            <Input
                                type="text"
                                value={user.email}
                                disabled
                            />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className='flex-1'>
                                <label className="w-1/5 text-gray-700 text-sm font-bold">
                                    FirstName
                                </label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="FirstName"
                                    value={user.firstName}
                                    onChange={onChangeData}
                                />
                            </div>
                            <div className='flex-1'>
                                <label className="w-1/5 text-gray-700 text-sm font-bold">
                                    LastName
                                </label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="LastName"
                                    value={user.lastName}
                                    onChange={onChangeData}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="w-1/5 text-gray-700 text-sm font-bold">
                                Phone
                            </label>
                            <Input
                                type="number"
                                name="phone"
                                placeholder="Phone"
                                value={user.phone}
                                min="0"
                                onChange={onChangeData}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                title="Save"
                                onClick={handleSave}
                                type="success"
                                size="md"
                                optionStyle="px-8 py-2.5"
                            />
                        </div>
                    </form>
                    <div className="w-full lg:w-auto lg:pl-10 lg:border-l">
                        <div className="w-full flex justify-center mb-2">
                            <img alt='' className="w-24 h-24 rounded-full" src={Avatar} />
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <label className="px-2 flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Index