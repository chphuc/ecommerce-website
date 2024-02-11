import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../utils/userUtils'
import { createOrder } from '../../utils/orderUtils'
import { notifySuccess, notifyError } from '../../components/Toast'

import ChangeAddress from './ChangeAddress'

import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'

import { RiArrowLeftSLine } from 'react-icons/ri'
import { GrLocation } from 'react-icons/gr'

const CheckOutForm = ({ dataCart, feeShip, limitFeeShip }) => {
	const navigate = useNavigate()

	const [user, setUser] = useState({})
	const [currentAddress, setCurrentAddress] = useState({})
	const [note, setNote] = useState('')
	const [showChangeAddress, setShowChangeAddress] = useState(false)

	const handleCloseChangeAddress = () => setShowChangeAddress(false)
	const handleOpenChangeAddress = () => setShowChangeAddress(true)

	const handleChangeCurrentAddress = (address) => {
		setCurrentAddress(address)
	}

	const handleFetchUser = () => {
		getUser()
			.then(res => {
				if (!res.data.data.address.length) {
					notifyError("Need to create a delivery address")
					navigate("/account/address")
				}

				if (!res.data.data.phone) {
					notifyError("Phone number cannot be empty")
					navigate("/account/information")
				}

				setUser(res.data.data)
				res.data.data.address.map(item => item.defaultAddress && setCurrentAddress(item))
			})
			.catch(err => console.log(err))
	}

	const handleOrder = () => {
		let total = 0
		dataCart.map(item => total += item.salePrice < item.regularPrice ? item.salePrice * item.quantityInCart : item.regularPrice * item.quantityInCart)

		createOrder({
			products: dataCart.map(item => ({
				productId: item._id,
				name: item.name,
				description: item.description,
				images: item.images,
				category: item.category,
				brand: item.brand,
				regularPrice: item.regularPrice,
				salePrice: item.salePrice,
				quantity: item.quantityInCart,
			})),
			total: total,
			shippingFee: total < limitFeeShip ? feeShip : 0,
			address: `${currentAddress.specificAddress}, ${currentAddress.village}, ${currentAddress.district}, ${currentAddress.province}`,
			note: note
		})
			.then(res => {
				notifySuccess(res.data.message)
				navigate('/')
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		handleFetchUser()
	}, [])
	return (
		<div className="lg:pr-10">
			{
				showChangeAddress &&
				<Modal>
					<ChangeAddress
						addresses={user.address}
						currentAddress={currentAddress}
						handleCloseChangeAddress={handleCloseChangeAddress}
						handleChangeCurrentAddress={handleChangeCurrentAddress}
					/>
				</Modal>
			}
			{
				user.address ?
					<div className="flex flex-col gap-y-4">
						<p className="text-2xl">Shipping address</p>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-x-2">
								<GrLocation className="text-lg" />
								<div className="flex items-center gap-x-2 font-medium">
									<p>{user.firstName} {user.lastName}</p>
									<p>-</p>
									<p>{user.phone}</p>
								</div>
								{currentAddress.defaultAddress && <p className="px-0.5 text-red-500 text-sm border border-red-500">Default</p>}
							</div>
							<Button
								title="Change"
								onClick={handleOpenChangeAddress}
								type="link"
								size="lg"
								optionStyle='px-0 pt-0 pb-0'
							/>
						</div>
						<div className="flex flex-col gap-y-4">
							<div className="flex flex-wrap items-center gap-x-4">
								<div className="basis-full lg:flex-1">
									<p className="font-medium">Province</p>
									<Input
										value={currentAddress.province}
										disabled
									/>
								</div>
								<div className="basis-full lg:flex-1">
									<p className="font-medium">District</p>
									<Input
										value={currentAddress.district}
										disabled
									/>
								</div>
								<div className="basis-full lg:flex-1">
									<p className="font-medium">Village</p>
									<Input
										value={currentAddress.village}
										disabled
									/>
								</div>
							</div>
							<div>
								<p className="font-medium">Specific Address</p>
								<Textarea
									rows="3"
									disabled
									value={currentAddress.specificAddress}
								/>
							</div>
							<div>
								<p className="font-medium">Note (optional)</p>
								<Textarea
									rows="3"
									value={note}
									onChange={e => setNote(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<Button
								title="Return to shipping"
								onClick={() => navigate('/')}
								type="link"
								size="lg"
								children={<RiArrowLeftSLine className='text-2xl' />}
								optionStyle='flex items-center gap-2 px-0 pt-0 pb-0'
							/>
							<Button
								title="Cofirm order"
								onClick={handleOrder}
								type="success"
								size="lg"
							/>
						</div>
					</div>
					:
					<div>
						Loading...
					</div>
			}
		</div>
	)
}

export default CheckOutForm