import Product from '../modals/Product.js'

const findAll = (req, res) => {
    try {
        Product.find({}, (err, products) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get products successfully',
                data: products
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findOne = (req, res) => {
    try {
        Product.findById(req.params.id, (err, product) => {
            if (err) return res.status(500).json({ message: err })
            if (!product) return res.status(400).json({ message: 'Product not found' })

            return res.status(200).json({ message: 'Get product successfully', data: product })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const create = (req, res) => {
    try {
        Product.findOne({ name: req.body.name }, (err, existProduct) => {
            if (err) return res.status(500).json({ message: err })
            if (existProduct) return res.status(400).json({ message: 'Product already exists' })

            const product = new Product(req.body)

            product.save((err, data) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({
                    message: 'Create product successfully',
                    data
                })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const update = (req, res) => {
    try {
        Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
            if (err) return res.status(500).json({ message: err })
            if (!product) return res.status(400).json({ message: 'Product not found' })

            return res.status(200).json({
                message: 'Update product successfully',
                data: product
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteOne = (req, res) => {
    try {
        Product.findByIdAndRemove(req.params.id, (err, product) => {
            if (err) return res.status(500).json({ message: err })
            if (!product) return res.status(400).json({ message: 'Product not found' })

            return res.status(200).json({
                message: 'Delete product successfully',
                data: product
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findSimilarProducts = (req, res) => {
    const defaultLimit = 5
    const { id } = req.params
    const { limit } = req.query
    if (!id) return res.status(400).json({ message: 'Id is required' })

    try {
        Product.findById(id, (err, product) => {
            if (err) return res.status(500).json({ message: err })
            if (!product) return res.status(400).json({ message: 'Product not found' })

            Product.find({ category: product.category }).limit(limit || defaultLimit).exec((err, products) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({
                    message: 'Get products successfully',
                    data: products.filter(item => item._id.toString() !== id)
                })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const searchProduct = (req, res) => {
    const { name } = req.params
    if (!name) return res.status(400).json({ message: 'Name product is required' })

    try {
        Product.find({ name: { $regex: name, $options: 'i' } }, (err, products) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get products successfully',
                data: products
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    deleteOne,
    findSimilarProducts,
    searchProduct
}