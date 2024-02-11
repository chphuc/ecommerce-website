import CustomerTableItem from "./CustomerTableItem"

const CustomerTable = ({ data, handleClickViewCustomer }) => {
    return (
        <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            #
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Email
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Username
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Create Date
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Role
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <CustomerTableItem
                            key={index}
                            index={index}
                            data={item}
                            handleClickViewCustomer={handleClickViewCustomer}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable