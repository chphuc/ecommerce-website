import Brand from '../modals/Brand.js'
import Product from '../modals/Product.js'

const findAll = (req, res) => {
    try {
        Brand.find({}, (err, brands) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get brands successfully',
                data: brands
            })

        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findOne = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Id brand is required' })
    try {
        Brand.findById(id, (err, brand) => {
            if (err) return res.status(500).json({ message: err })
            if (!brand) return res.status(404).json({ message: 'Brand not found' })

            return res.status(200).json({
                message: 'Get brand successfully',
                data: brand
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
        Brand.findOne({ name: req.body.name }, (err, existBrand) => {
            if (err) return res.status(500).json({ message: err })
            if (existBrand) return res.status(400).json({ message: 'Brand already exists' })

            const brand = new Brand(req.body)

            brand.save((err, data) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({
                    message: 'Create brand successfully',
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

    if (!id) return res.status(400).json({ message: 'Brand ID is required' })
    if (!name || !image) return res.status(400).json({ message: 'All fields are required' })
    try {
        Brand.findById(id, (err, brand) => {
            if (err) return res.status(500).json({ message: err })
            if (!brand) return res.status(400).json({ message: 'Brand not found' })

            if (brand.name !== name) {
                Product.updateMany({ brand: brand.name }, { $set: { brand: name } }, (err) => {
                    if (err) return res.status(500).json({ message: err })
                })
            }

            brand.name = name
            brand.image = image
            brand.save((err, data) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({
                    message: 'Update brand successfully',
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
    if (!id) return res.status(400).json({ message: 'Brand ID is required' })

    try {
        Brand.findByIdAndRemove(id, (err, brand) => {
            if (err) return res.status(500).json({ message: err })

            Product.updateMany({ brand: brand.name }, { $set: { brand: null } }, (err) => {
                if (err) return res.status(500).json({ message: err })
            })

            return res.status(200).json({
                message: `Delete brand ${brand.name} successfully`,
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
    deleteOne
}