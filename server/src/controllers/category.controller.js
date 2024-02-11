import Category from '../modals/Category.js'
import Product from '../modals/Product.js'

const findAll = (req, res) => {
    try {
        Category.find({}, (err, category) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get category successfully',
                data: category
            })

        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findOne = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Id category is required' })
    try {
        Category.findById(id, (err, category) => {
            if (err) return res.status(500).json({ message: err })
            if (!category) return res.status(404).json({ message: 'Category not found' })

            return res.status(200).json({
                message: 'Get category successfully',
                data: category
            })

        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const create = (req, res) => {
    const { name, image } = req.body
    if (!name || !image) return res.status(400).json({ message: 'All fields is required' })

    try {
        Category.findOne({ name: req.body.name }, (err, existCategory) => {
            if (err) return res.status(500).json({ message: err })
            if (existCategory) return res.status(400).json({ message: 'Category already exists' })

            const category = new Category(req.body)

            category.save((err, data) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({
                    message: 'Create category successfully',
                    data
                })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const update = (req, res) => {
    const { id } = req.params
    const { name, image } = req.body

    if (!id) return res.status(400).json({ message: 'Category ID is required' })
    if (!name || !image) return res.status(400).json({ message: 'All fields are required' })

    try {
        Category.findById(id, (err, category) => {
            if (err) return res.status(500).json({ message: err })
            if (!category) return res.status(400).json({ message: 'Category not found' })

            if (category.name !== name) {
                Product.updateMany({ category: category.name }, { $set: { category: name } }, (err) => {
                    if (err) return res.status(500).json({ message: err })
                })
            }

            category.name = name
            category.image = image
            category.save((err, data) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({
                    message: 'Update category successfully',
                    data
                })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteOne = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Category ID is required' })

    try {
        Category.findByIdAndRemove(id, (err, category) => {
            if (err) return res.status(500).json({ message: err })

            Product.updateMany({ category: category.name }, { $set: { category: null } }, (err) => {
                if (err) return res.status(500).json({ message: err })
            })

            return res.status(200).json({
                message: `Delete category ${category.name} successfully`,
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getQuantityByCategory = (req, res) => {
    const { category } = req.params
    if (!category) return res.status(400).json({ message: 'Category name is required' })

    try {
        Product.find({ category: category }, (err, products) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get quantity by category successfully',
                category: category,
                quantity: products.length
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
    getQuantityByCategory
}