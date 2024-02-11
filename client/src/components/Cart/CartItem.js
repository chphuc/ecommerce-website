import { HiMinusSm } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

const CartItem = ({
    data,
    handleFormatNameItemCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleChangeQuantity,
    handleRemoveProduct,
    handleMoveDetailProductPage,
}) => {
    const onChangeQuantity = (e) => {
        if (e.target.value <= 0) {
            handleChangeQuantity(data._id, 1)
        } else if (e.target.value >= data.quantity) {
            handleChangeQuantity(data._id, data.quantity)
        } else {
            handleChangeQuantity(data._id, e.target.value)
        }
    }

    return (
        <div className="flex items-center mb-2">
            <img
                onClick={() => handleMoveDetailProductPage(data._id)}
                alt=""
                className="w-24 cursor-pointer"
                src={data.images[0]}
            />
            <div className="pl-4">
                <p
                    onClick={() => handleMoveDetailProductPage(data._id)}
                    className="font-medium cursor-pointer hover:underline"
                >
                    {handleFormatNameItemCart(data.name)}
                </p>
                <div className="flex items-center gap-x-2">
                    <p className={' ' + (data.salePrice < data.regularPrice ? 'line-through' : 'font-medium')}>
                        ${data.regularPrice}.00
                    </p>
                    {data.salePrice < data.regularPrice && <p className="font-medium">${data.salePrice}.00</p>}
                </div>
                <div className="flex items-center mt-2.5">
                    <div className="flex items-center overflow-hidden rounded bg-slate-200">
                        <button onClick={() => handleDecreaseQuantity(data._id)} className="p-2">
                            <HiMinusSm />
                        </button>
                        <input
                            className="w-9 text-center bg-slate-200 outline-none"
                            type="number"
                            value={data.quantityInCart}
                            onChange={onChangeQuantity}
                            min="0"
                        />
                        <button onClick={() => handleIncreaseQuantity(data._id)} className="p-2">
                            <IoMdAdd />
                        </button>
                    </div>
                    <button
                        onClick={() => handleRemoveProduct(data._id)}
                        className="opacity-80 text-sm underline p-2 ml-2"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
