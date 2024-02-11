import Button from '../../../components/Button'

const ProductManagementTableItem = ({ index, item, handleClickEditProduct, handleClickRemoveProduct }) => {
    const formatString = (str, maxLength) => {
        if (str.length < maxLength) return str
        else return str.substr(0, maxLength - 3) + '...'
    }

    return (
        <tr key={index} className={'border-b ' + (index % 2 ? '' : 'bg-gray-50')}>
            <td className='px-6 py-3'>
                {index + 1}
            </td>
            <td className='px-6 py-3'>
                <img alt='' className='h-10' src={item.images[0]} />
            </td>
            <th scope='row' className='px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
                {formatString(item.name, 20)}
            </th>
            <td className='px-6 py-3'>
                {item.category || '-'}
            </td>
            <td className='px-6 py-3'>
                {item.brand || '-'}
            </td>
            <td className='px-6 py-3'>
                <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>{item.regularPrice}</span>
                {item.salePrice < item.regularPrice && <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>{item.salePrice}</span>}
            </td>
            <td className='px-6 py-3'>
                <div className='flex items-center gap-x-2'>
                    <Button
                        title='Edit'
                        type='none'
                        size='sm'
                        onClick={() => handleClickEditProduct(item._id)}
                        optionStyle='px-0 font-medium text-blue-600 hover:underline shadow-none'
                    />
                    <Button
                        title='Remove'
                        type='none'
                        size='sm'
                        onClick={() => handleClickRemoveProduct(item._id)}
                        optionStyle='px-0 font-medium text-red-600 hover:underline shadow-none'
                    />
                </div>
            </td>
        </tr>
    )
}

export default ProductManagementTableItem