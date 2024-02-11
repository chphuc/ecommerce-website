const ProductsFilterItem = ({ title, data = [], handleChangeFilter, getCheckedInput }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='font-medium uppercase'>{title}</p>
            {
                data.length &&
                data.map(item => (
                    <div key={item.name} className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            name={title}
                            value={item.name}
                            checked={getCheckedInput(title, item.name)}
                            onChange={handleChangeFilter}
                        />
                        <p>{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductsFilterItem