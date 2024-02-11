const ProductDetailAdvantage = () => {
    const data = [
        {
            image: "https://cdn.shopify.com/s/files/1/0591/1350/4958/files/Frame_1.png?v=1628328907",
            title: "Free Shipping",
            desc: "Get complimentary ground shipping on every order. Don't love it? Send it back, on us."
        },
        {
            image: "https://cdn.shopify.com/s/files/1/0591/1350/4958/files/Frame_2.png?v=1628328907",
            title: "Earn Points",
            desc: "Join Minimog Rewards to earn gift cards and enjoy exclusive member benefits."
        },
        {
            image: "https://cdn.shopify.com/s/files/1/0591/1350/4958/files/Frame_3.png?v=1628328907",
            title: "Money Back Guarantee",
            desc: "We believe getting dressed should be the easiest part of your day."
        }
    ]

    return (
        <div>
            <div className="text-center mb-10">
                <p className="text-3xl">Why Minimog?</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
                {
                    data.map(item => (
                        <div key={item.title} className="text-center px-16">
                            <div className="w-full flex justify-center mb-4">
                                <img alt='' className="w-16" src={item.image} />
                            </div>
                            <p className="text-lg mb-1.5">{item.title}</p>
                            <p className="text-gray-500">{item.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductDetailAdvantage