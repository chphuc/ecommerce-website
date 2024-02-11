import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { route } from '../../routes'
import { signIn } from '../../utils/authUtils'
import { notifySuccess, notifyError } from '../../components/Toast'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Index = () => {
	const navigate = useNavigate()

	const [signInValue, setSignInValue] = useState({
		userName: '',
		password: ''
	})

	const onChangeSignInValue = (e) => {
		setSignInValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleSignIn = e => {
		e.preventDefault()

		for (const key in signInValue) {
			if (signInValue[key] === '') return notifyError('Missing ' + key + ' value')
		}

		signIn(signInValue)
			.then(res => {
				notifySuccess(res.data.message)
				navigate(route.home)
			})
			.catch(err => {
				notifyError(err.response.data.message)
			})
	}

	return (
		<div className="h-full flex items-center justify-center">
			<div className='flex-1 flex flex-col gap-y-4'>
				<Link to={route.home} className="flex items-center justify-center gap-x-2">
					<img alt='logo' className="w-8 h-8" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" />
					<p className='text-2xl font-semibold text-gray-900'>Minimog</p>
				</Link>
				<div className='flex flex-col gap-y-6 px-10'>
					<h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900">
						Sign in to your account
					</h1>
					<form onSubmit={handleSignIn} className='flex flex-col gap-y-6' >
						<div>
							<label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
							<Input
								type="text"
								name="userName"
								value={signInValue.userName}
								onChange={onChangeSignInValue}
							/>
						</div>
						<div>
							<label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
							<Input
								type="password"
								name="password"
								value={signInValue.password}
								onChange={onChangeSignInValue}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
								</div>
								<div className="ml-3 text-sm">
									<label className="text-gray-500 dark:text-gray-300">Remember me</label>
								</div>
							</div>
							<a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
						</div>
						<Button
							title='Sign In'
							type='none'
							onClick={handleSignIn}
							optionStyle='text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150'
						/>
						<p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
							Don’t have an account yet? <Link to={route.signUp} className="font-medium text-primary-600 hover:underline">Sign up</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Index