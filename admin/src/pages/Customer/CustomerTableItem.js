import Button from '../../components/Button'

const CustomerTableItem = ({ index, data, handleClickViewCustomer }) => {
    const convertTimestamp = (timestamp) => {
        // Convert string timestamp to Date object
        var dateObj = new Date(timestamp);

        // Extract individual components
        var year = dateObj.getUTCFullYear();
        var month = ("0" + (dateObj.getUTCMonth() + 1)).slice(-2);
        var day = ("0" + dateObj.getUTCDate()).slice(-2);
        var hour = ("0" + dateObj.getUTCHours()).slice(-2);
        var minute = ("0" + dateObj.getUTCMinutes()).slice(-2);

        // Create date and time strings
        var dateStr = year + "-" + month + "-" + day;
        var timeStr = hour + ":" + minute

        return { date: dateStr, time: timeStr };
    }
    return (
        <tr className={'border-b ' + (index % 2 ? '' : 'bg-gray-50')}>
            <td className='px-6 py-3'>
                {index + 1}
            </td>
            <td className='px-6 py-3'>
                {data.email}
            </td>
            <th className='px-6 py-3'>
                {data.userName}
            </th>
            <td className='px-6 py-3'>
                {convertTimestamp(data.createdAt).date + ' ' + convertTimestamp(data.createdAt).time}
            </td>
            <td className='px-6 py-3'>
                {data.role}
            </td>
            <td className='px-6 py-3'>
                <div className='flex items-center gap-x-2'>
                    <Button
                        title='View'
                        type='none'
                        onClick={() => handleClickViewCustomer(data._id)}
                        optionStyle='text-blue-600 hover:underline shadow-none'
                    />
                </div>
            </td>
        </tr >
    )
}

export default CustomerTableItem