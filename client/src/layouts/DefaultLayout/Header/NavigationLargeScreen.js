import NavigationLargeScreenItem from './NavigationLargeScreenItem'

const NavigationLargeScreen = ({ data }) => {
    return (
        <>
            {
                data.map(item => (
                    <NavigationLargeScreenItem
                        key={item.title}
                        data={item}
                    />
                ))
            }
        </>
    )
}

export default NavigationLargeScreen