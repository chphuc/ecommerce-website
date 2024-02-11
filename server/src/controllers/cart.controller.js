import Cart from '../modals/Cart.js'

const findOne = (req, res) => {
    try {
        Cart.findOne({ userId: req.userId }, (err, cart) => {
            if (err) return res.status(500).json({ message: err })
            if (!cart) {
                const newCart = new Cart({ userId: req.userId })
                newCart.save((err, cart) => {
                    if (err) return res.status(500).json({ message: err })
                    return res.status(200).json({ message: 'Get cart successfully', data: cart })
                })
            }
            return res.status(200).json({ message: 'Get cart successfully', data: cart })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const add = (req, res) => {
    try {
        const { productId, name, description, images, category, brand, regularPrice, salePrice, quantity } = req.body

        Cart.findOne({ userId: req.userId }, (err, cart) => {
            if (err) return res.status(500).json({ message: err })

            if (!cart) cart = new Cart({ userId: req.userId })

            const itemIndex = cart.products.findIndex(product => product.productId === productId)
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity
            } else {
                cart.products.push({
                    productId,
                    name,
                    description,
                    images,
                    category,
                    brand,
                    regularPrice,
                    salePrice,
                    quantity
                })
            }

            cart.save((err, cart) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({ message: 'Add product successfully' })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const update = (req, res) => {
    try {
        const { id } = req.params
        const { quantity } = req.body

        Cart.findOne({ userId: req.userId }, (err, cart) => {
            if (err) return res.status(500).json({ message: err })
            if (!cart) return res.status(400).json({ message: 'Cart not found' })

            const itemIndex = cart.products.findIndex(product => product.productId === id)
            if (itemIndex === -1) return res.status(400).json({ message: 'Product not found' })

            cart.products[itemIndex].quantity = quantity
            cart.save((err, cart) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({ message: 'Update quantity successfully' })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteOne = (req, res) => {
    try {
        const { id } = req.params
        Cart.findOne({ userId: req.userId }, (err, cart) => {
            if (err) return res.status(500).json({ message: err })
            if (!cart) return res.status(400).json({ message: 'Cart not found' })

            const itemIndex = cart.products.findIndex(product => product.productId === id)
            if (itemIndex === -1) return res.status(400).json({ message: 'Product not found' })
            else cart.products.splice(itemIndex, 1)

            cart.save((err, cart) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({ message: 'Delete product successfully' })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    findOne,
    add,
    update,
    deleteOne
}