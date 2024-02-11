import ProductManagementTableItem from './ProductManagementTableItem'

const ProductManagementTable = ({ data, handleClickEditProduct, handleClickRemoveProduct }) => {
    return (
        <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            #
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Image
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Product name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Category
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Brand
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Price
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <ProductManagementTableItem
                            key={index}
                            index={index}
                            item={item}
                            handleClickEditProduct={handleClickEditProduct}
                            handleClickRemoveProduct={handleClickRemoveProduct}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductManagementTable