import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { route } from '../../routes'
import { signUp } from '../../utils/authUtils'
import { notifySuccess, notifyError } from '../../components/Toast'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Index = () => {
    const navigate = useNavigate()
    const [signUpValue, setSignUpValue] = useState({
        email: '',
        userName: '',
        firstName: '',
        lastName: '',
        password: ''
    })

    const onChangeSignUpValue = e => {
        setSignUpValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSignUp = e => {
        e.preventDefault()

        for (const key in signUpValue) {
            if (signUpValue[key] === '') return notifyError('Missing ' + key + ' value')
        }

        signUp({ ...signUpValue, role: 'user' })
            .then(res => {
                notifySuccess('Create user success')
                navigate(route.signIn)
            })
            .catch(err => {
                notifyError(err.response.data.message)
            })
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex-1 flex flex-col gap-y-4 px-10">
                <Link to={route.home} className="flex items-center justify-center gap-x-2">
                    <img alt='logo' className="w-8 h-8" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" />
                    <p className='text-2xl font-semibold text-gray-900'>Minimog</p>
                </Link>
                <div className='flex flex-col gap-y-6'>
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900">
                        Signup to your account
                    </h1>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-y-6" >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <Input
                                type="email"
                                name="email"
                                onChange={onChangeSignUpValue}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <Input
                                type="text"
                                name="userName"
                                onChange={onChangeSignUpValue}
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="basis-full flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    onChange={onChangeSignUpValue}
                                />
                            </div>
                            <div className="basis-full flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    onChange={onChangeSignUpValue}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <Input
                                type="password"
                                name="password"
                                autoComplete="on" onChange={onChangeSignUpValue}
                            />
                        </div>
                        <Button
                            title='Sign Up'
                            type='none'
                            onClick={handleSignUp}
                            optionStyle='text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150'
                        />
                        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to={route.signIn} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index