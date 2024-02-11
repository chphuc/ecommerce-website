import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signIn } from '../../utils/AuthUtils'
import { notifyError, notifySuccess } from '../../components/Toast'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Index = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        userName: '',
        password: ''
    })
    const handleChangeInput = e => {
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

        signIn({ ...input })
            .then(res => {
                notifySuccess(res.data.message)
                navigate('/')
            })
            .catch(err => notifyError(err.response.data.message))
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='flex-1 px-10 lg:px-40'>
                <p className='mb-10 text-2xl font-medium text-center'>Sign In</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
                    <Input
                        type='text'
                        placeholder='Username'
                        name='userName'
                        value={input.email}
                        onChange={handleChangeInput}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={input.password}
                        onChange={handleChangeInput}
                    />
                    <Button
                        title='Sign In'
                        type='default'
                        size='lg'
                        onClick={handleSubmit}
                    />
                    <div className='flex items-center justify-center gap-x-2'>
                        <p className='text-gray-500'>Not a Member yet?</p>
                        <Link to='/signup'>
                            <p className='text-sky-600'>Sign up</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index