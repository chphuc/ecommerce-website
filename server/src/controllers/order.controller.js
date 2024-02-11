import Order from '../modals/Order.js'

const getAllOrders = (req, res) => {
    try {
        Order.find({}).sort({ createdAt: -1 }).exec((err, orders) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({ message: 'Get orders successfully', data: orders })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getMyOrders = (req, res) => {
    try {
        Order.find({ userId: req.userId }).sort({ createdAt: -1 }).exec((err, orders) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({ message: 'Get orders successfully', data: orders })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getMyOrderById = (req, res) => {
    try {
        Order.findById(req.params.id, (err, order) => {
            if (err) return res.status(500).json({ message: err })
            if (!order) return res.status(400).json({ message: 'Order not found' })

            return res.status(200).json({ message: 'Get order successfully', data: order })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const create = (req, res) => {
    try {
        const newOrder = new Order({
            ...req.body,
            userId: req.userId
        })

        newOrder.save((err) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({ message: 'Create order successfully' })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const confirmOrder = (req, res) => {
    try {
        Order.findById(req.params.id, (err, order) => {
            if (err) return res.status(500).json({ message: err })
            if (!order) return res.status(400).json({ message: 'Order not found' })

            order.status = 'confirm'
            order.confirmByAdminId = req.userId
            order.confirmAt = new Date()

            order.save((err) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({ message: 'Confirm order successfully', data: order })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const declineOrder = (req, res) => {
    const { declineReason } = req.body
    if (!declineReason) return res.status(400).json({ message: 'Decline reason is required' })

    try {
        Order.findById(req.params.id, (err, order) => {
            if (err) return res.status(500).json({ message: err })
            if (!order) return res.status(400).json({ message: 'Order not found' })

            order.status = 'decline'
            order.declineReason = declineReason
            order.confirmByAdminId = req.userId
            order.confirmAt = new Date()

            order.save((err) => {
                if (err) return res.status(500).json({ message: err })

                return res.status(200).json({ message: 'Decline order successfully', data: order })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getUserOrders = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'userId is required' })

    try {
        Order.find({ userId: id }).sort({ createdAt: -1 }).exec((err, orders) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({ message: 'Get orders successfully', data: orders })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getUserOrderById = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'userId is required' })

    try {
        Order.findById(id, (err, order) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({ message: 'Get order successfully', data: order })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    getAllOrders,
    getMyOrders,
    getMyOrderById,
    create,
    confirmOrder,
    declineOrder,
    getUserOrders,
    getUserOrderById
}