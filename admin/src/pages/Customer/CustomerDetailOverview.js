import CustomerDetailOverviewItem from "./CustomerDetailOverviewItem"

const CustomerDetailOverview = ({ props }) => {
    const data = [
        {
            title: 'Total Money',
            value: props.dataUserOrder.reduce((total, order) => {
                return total += order.total
            }, 0) + '.00'
        },
        {
            title: 'Total Order',
            value: props.dataUserOrder.length
        },
        {
            title: 'Pending Order',
            value: props.dataUserOrder.filter(order => order.status === 'pending').length
        },
        {
            title: 'Confirmed Order',
            value: props.dataUserOrder.filter(order => order.status === 'confirm').length
        },
        {
            title: 'Decline Order',
            value: props.dataUserOrder.filter(order => order.status === 'decline').length
        },
    ]

    return (
        <div className='grid grid-cols-1 gap-4'>
            {
                data.map(item => (
                    <CustomerDetailOverviewItem
                        key={item.title}
                        title={item.title}
                        value={item.value}
                    />
                ))
            }
        </div>
    )
}

export default CustomerDetailOverview