import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signUp } from '../../utils/AuthUtils'
import { notifyError, notifySuccess } from '../../components/Toast'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Index = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        userName: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: ''
    })
    const [security, setSecurity] = useState(0)

    const validPassword = (str) => {
        let count = 0;

        // Check if the string has 8 or more characters
        if (str.length >= 8) {
            count++;
        }

        // Check if the string contains at least one letter
        if (/[a-zA-Z]/.test(str)) {
            count++;
        }

        // Check if the string contains at least one number
        if (/\d/.test(str)) {
            count++;
        }

        // Check if the string contains at least one symbol
        if (/[^a-zA-Z0-9]/.test(str)) {
            count++;
        }

        return count;
    }

    const handleChangeInput = e => {
        if (e.target.name === 'password') {
            setSecurity(validPassword(e.target.value))
        }
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        for (const key in input) {
            if (input[key] === '') {
                notifyError('Missing ' + key + ' value')
                return
            }
        }

        if (!/^\S+@\S+\.\S+$/.test(input.email)) {
            notifyError('Invalid email format')
            return
        }

        if (input.password !== input.repeatPassword) {
            notifyError('Password do not match')
            return
        }

        signUp({
            email: input.email,
            userName: input.userName,
            firstName: input.firstName,
            lastName: input.lastName,
            password: input.password,
            role: 'admin'
        })
            .then(res => {
                notifySuccess(res.data.message)
                navigate('/signin')
            })
            .catch(err => notifyError(err.response.data.message))
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='flex-1 px-10 lg:px-40'>
                <p className='mb-10 text-2xl font-medium text-center'>Sign Up</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
                    <Input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={input.email}
                        onChange={handleChangeInput}
                    />
                    <Input
                        type='text'
                        placeholder='User Name'
                        name='userName'
                        value={input.userName}
                        onChange={handleChangeInput}
                    />
                    <div className='flex items-center gap-x-4'>
                        <Input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            value={input.firstName}
                            onChange={handleChangeInput}
                        />
                        <Input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            value={input.lastName}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={input.password}
                        onChange={handleChangeInput}
                    />
                    <div className='h-1.5 flex items-center gap-x-2'>
                        {[...new Array(4)].map((item, index) => (
                            <div key={index} className={'flex-1 h-full rounded-full ' + (index < security ? 'bg-green-400' : 'bg-gray-200')}></div>
                        ))}
                    </div>
                    <p className='text-sm text-gray-400'>Use 8 or more characters with a mix of letters, numbers & symbols.</p>
                    <Input
                        type='password'
                        placeholder='Repeat Password'
                        name='repeatPassword'
                        value={input.repeatPassword}
                        onChange={handleChangeInput}
                    />
                    <Button
                        title='Sign Up'
                        type='default'
                        size='lg'
                        onClick={handleSubmit}
                    />
                    <div className='flex items-center justify-center gap-x-2'>
                        <p className='text-gray-500'>Already have an Account?</p>
                        <Link to='/signin'>
                            <p className='text-sky-600'>Sign In</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index