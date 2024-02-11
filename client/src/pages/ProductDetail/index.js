import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addToCart } from '../../features/cart/cartSilce'
import { notifySuccess } from '../../components/Toast'
import { getProductById } from '../../utils/productUtils'
import ProductDetailSlide from './ProductDetailSlide'
import SimilarProduct from './SimilarProduct'
import ProductDetailAdvantage from './ProductDetailAdvantage'
import Button from '../../components/Button'

import { BiChevronRight } from 'react-icons/bi'
import { HiMinusSm } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { TbArrowsDownUp } from 'react-icons/tb'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsBoxSeam } from 'react-icons/bs'

const Index = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [data, setData] = useState({})
	const [quantity, setQuantity] = useState(1)
	const actionData = [
		{
			title: "Compare",
			icon: <TbArrowsDownUp />
		},
		{
			title: "Ask a question",
			icon: <AiOutlineQuestionCircle />
		},
		{
			title: "Share",
			icon: <AiOutlineShareAlt />
		}
	]

	const handleChangeQuantity = e => {
		let newQuantity
		if (e.target.value < 1) newQuantity = 1
		if (e.target.value > data.quantity) newQuantity = data.quantity

		setQuantity(newQuantity)
	}

	const handleDecreaseQuantity = () => {
		setQuantity(prev => prev === 1 ? 1 : prev - 1)
	}

	const handleIncreaseQuantity = () => {
		setQuantity(prev => prev === data.quantity ? data.quantity : prev + 1)
	}

	const handleAddCart = () => {
		dispatch(addToCart({ ...data, quantityInCart: quantity }))
		notifySuccess('Added to your cart')
	}

	const GetDeliverDay = () => {
		const options = { month: 'short', day: 'numeric' }

		let today = new Date()
		let nextDay2 = new Date()
		nextDay2.setDate(today.getDate() + 2)

		let currentDateString = today.toLocaleDateString('en-US', options)
		let nextDay2String = nextDay2.toLocaleDateString('en-US', options)

		return currentDateString + ' - ' + nextDay2String
	}

	useEffect(() => {
		getProductById(id)
			.then(res => setData(res.data.data))
			.catch(err => console.log(err))
	}, [id])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [id])

	return (
		<div>
			{
				!data._id ?
					<div>Loadding...</div>
					:
					<div className='px-4 lg:px-12'>
						<div className="flex flex-wrap items-center justify-center py-7">
							<Link to="/" className="hover:text-gray-400 transition duration-200">Home</Link>
							<BiChevronRight className="mx-3" />
							<Link to="/products" className="hover:text-gray-400 transition duration-200">Products</Link>
							<BiChevronRight className="mx-3" />
							<p>{data.name?.substring(0, 15) + '...'}</p>
						</div>
						<div className="flex flex-col lg:flex-row gap-4">
							<div className="w-full lg:w-1/2 h-96 lg:h-screen">
								<ProductDetailSlide data={data.images} />
							</div>
							<div className="flex flex-col gap-2 w-full lg:w-1/2">
								<p className="text-3xl">{data.name}</p>
								<div className="flex items-center">
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
									<svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
								</div>
								<p className="text-sm text-gray-600">{data.description}</p>
								<div className="flex items-center gap-4">
									<p className={"text-2xl " + (data.salePrice < data.regularPrice ? "line-through" : "")}>${data.regularPrice}.00</p>
									{data.salePrice < data.regularPrice && <p className="text-2xl ">${data.salePrice}.00</p>}
								</div>
								<div className="flex flex-col gap-4">
									<p>Only <span className="font-medium text-lg">{data.quantity}</span> item(s) left in stock!</p>
									<div className="h-1.5 rounded bg-gray-200">
										<div style={{ width: ` ${data.quantity}%` }} className="h-full bg-red-500 rounded"></div>
									</div>
								</div>
								<div className='flex flex-col gap-4'>
									<p className="font-medium">Quantity</p>
									<div className="flex items-center gap-4">
										<div className="flex items-center rounded bg-gray-200">
											<button className="p-3 h-10" onClick={handleDecreaseQuantity}>
												<HiMinusSm />
											</button>
											<input className="w-9 text-center bg-gray-200 outline-none" type="number" value={quantity} min="0" onChange={handleChangeQuantity} />
											<button className="p-3 h-10" onClick={handleIncreaseQuantity}>
												<IoMdAdd />
											</button>
										</div>
										<div className="flex-1">
											<Button
												title="Add to cart"
												onClick={handleAddCart}
												type="outlineToDark"
												size="full"
												optionStyle='border border-black'
											/>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-4 py-4 border-b">
									{
										actionData.map(item => (
											<button key={item.title} className="flex items-center gap-2">
												<span className="text-2xl">{item.icon}</span>
												<span>{item.title}</span>
											</button>
										))
									}
								</div>
								<div className='flex flex-col gap-4'>
									<div className="flex items-center gap-2">
										<TbTruckDelivery className="text-xl" />
										<p className="font-semibold">Estimated Delivery :</p>
										<p>{GetDeliverDay()}</p>
									</div>
									<div className="flex items-center gap-2">
										<BsBoxSeam className="text-xl" />
										<p className="font-semibold">Free Shipping & Returns :</p>
										<p>On all orders over $25</p>
									</div>
								</div>
								<div style={{ backgroundColor: '#F8F8F8' }} className="flex flex-col gap-4 p-5 text-center">
									<div className="flex justify-center">
										<img alt='' src="https://cdn.shopify.com/s/files/1/0591/1350/4958/files/trustbag.png?v=1628329053&width=360" />
									</div>
									<p>Guarantee safe & secure checkout</p>
								</div>
							</div>
						</div>
						<div className="mt-20">
							<SimilarProduct productId={data._id} />
						</div>
						<div className="my-40">
							<ProductDetailAdvantage />
						</div>
					</div>
			}
		</div>
	)
}

export default Index