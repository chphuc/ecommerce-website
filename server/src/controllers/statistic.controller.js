import Order from '../modals/Order.js'
import Brand from '../modals/Brand.js'
import Category from '../modals/Category.js'

const getStatisticOrder = (req, res) => {
    try {
        const currentDate = new Date()
        let dateRangeStart

        switch (req.params.timeOption) {
            case 'last7days':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setDate(currentDate.getDate() - 7)
                break
            case 'last30days':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setDate(currentDate.getDate() - 30)
                break
            case 'last3months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setMonth(currentDate.getMonth() - 3)
                break
            case 'last6months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setMonth(currentDate.getMonth() - 6)
                break
            case 'last12months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setFullYear(currentDate.getFullYear() - 1)
                break
            default:
                return res.status(400).json({ message: 'Invalid time option' })
        }

        Order.find({ createdAt: { $gte: dateRangeStart, $lte: currentDate } }, (err, orders) => {
            if (err) return res.status(500).json({ message: err })

            const totalConfirmOrder = orders.filter(order => order.status === 'confirm').length
            const totalPendingOrder = orders.filter(order => order.status === 'pending').length
            const totalDeclineOrder = orders.filter(order => order.status === 'decline').length
            const totalRevenue = orders.filter(order => order.status === 'confirm').reduce((total, order) => total + order.total, 0)
            const averageRevenue = orders.filter(order => order.status === 'confirm').length > 0 ? totalRevenue / totalConfirmOrder : 0

            return res.status(200).json({
                message: 'Get statistic orders successfully',
                data: {
                    totalOrder: orders.length,
                    totalConfirmOrder,
                    totalPendingOrder,
                    totalDeclineOrder,
                    totalRevenue,
                    averageRevenue
                }
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getStatisticCategory = (req, res) => {
    try {
        const currentDate = new Date()
        let dateRangeStart

        switch (req.params.timeOption) {
            case 'last7days':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setDate(currentDate.getDate() - 7)
                break
            case 'last30days':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setDate(currentDate.getDate() - 30)
                break
            case 'last3months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setMonth(currentDate.getMonth() - 3)
                break
            case 'last6months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setMonth(currentDate.getMonth() - 6)
                break
            case 'last12months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setFullYear(currentDate.getFullYear() - 1)
                break
            default:
                return res.status(400).json({ message: 'Invalid time option' })
        }

        Order.aggregate([
            {
                $match: { createdAt: { $gte: dateRangeStart, $lte: currentDate }, status: 'confirm' }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.category",
                    quantity: { $sum: "$products.quantity" },
                    revenue: { $sum: { $multiply: ["$products.salePrice", "$products.quantity"] } }
                }
            }
        ], (err, result) => {
            if (err) return res.status(500).json({ message: err })

            Category.find({}, (err, categoryList) => {
                if (err) return res.status(500).json({ message: err })

                categoryList.map(category => {
                    if (!result.some(item => item._id === category.name)) {
                        result.push({
                            _id: category.name,
                            quantity: 0,
                            revenue: 0
                        })
                    }
                })

                return res.status(200).json({
                    message: 'Get statistic category successfully',
                    data: result
                })
            })
        })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

const getStatisticTransaction = (req, res) => {
    try {
        const monthTimeOption = ['last3months', 'last6months', 'last12months']
        const currentDate = new Date()
        let startDate
        let rangeDate = []

        switch (req.params.timeOption) {
            case 'last7days':
                startDate = new Date(currentDate)
                startDate.setDate(currentDate.getDate() - 7)
                for (let date = new Date(startDate); date <= currentDate; date.setDate(date.getDate() + 1)) {
                    rangeDate.push(date.toISOString().slice(0, 10))
                }
                break
            case 'last30days':
                startDate = new Date(currentDate)
                startDate.setDate(currentDate.getDate() - 30)
                for (let date = new Date(startDate); date <= currentDate; date.setDate(date.getDate() + 1)) {
                    rangeDate.push(date.toISOString().slice(0, 10))
                }
                break
            case 'last3months':
                startDate = new Date(currentDate)
                startDate.setMonth(currentDate.getMonth() - 3)
                for (let date = new Date(startDate); date <= currentDate; date.setMonth(date.getMonth() + 1)) {
                    rangeDate.push(date.toISOString().slice(0, 7))
                }
                break
            case 'last6months':
                startDate = new Date(currentDate)
                startDate.setMonth(currentDate.getMonth() - 6)
                for (let date = new Date(startDate); date <= currentDate; date.setMonth(date.getMonth() + 1)) {
                    rangeDate.push(date.toISOString().slice(0, 7))
                }
                break
            case 'last12months':
                startDate = new Date(currentDate)
                startDate.setFullYear(currentDate.getFullYear() - 1)
                for (let date = new Date(startDate); date <= currentDate; date.setMonth(date.getMonth() + 1)) {
                    rangeDate.push(date.toISOString().slice(0, 7))
                }
                break
            default:
                return res.status(400).json({ message: 'Invalid time option' })
        }

        Order.aggregate([
            {
                $match: { createdAt: { $gte: startDate, $lte: currentDate }, status: 'confirm' }
            },
            {
                $group: {
                    _id: { $dateToString: { format: monthTimeOption.includes(req.params.timeOption) ? "%Y-%m" : "%Y-%m-%d", date: "$createdAt" } },
                    totalRevenue: { $sum: "$total" },
                    totalOrder: { $sum: 1 }
                }
            }
        ], (err, result) => {
            if (err) return res.status(500).json({ message: err })

            const finalResult = rangeDate.map(date => {
                const isDateWithOrder = result.find(item => item._id === date)
                return {
                    _id: date,
                    totalRevenue: isDateWithOrder ? isDateWithOrder.totalRevenue : 0,
                    totalOrder: isDateWithOrder ? isDateWithOrder.totalOrder : 0
                }
            })

            return res.status(200).json({
                message: `Get statistic transaction for ${req.params.timeOption} successfully`,
                data: finalResult
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getStatisticBrand = (req, res) => {
    try {
        const currentDate = new Date()
        let dateRangeStart

        switch (req.params.timeOption) {
            case 'last7days':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setDate(currentDate.getDate() - 7)
                break
            case 'last30days':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setDate(currentDate.getDate() - 30)
                break
            case 'last3months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setMonth(currentDate.getMonth() - 3)
                break
            case 'last6months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setMonth(currentDate.getMonth() - 6)
                break
            case 'last12months':
                dateRangeStart = new Date(currentDate)
                dateRangeStart.setFullYear(currentDate.getFullYear() - 1)
                break
            default:
                return res.status(400).json({ message: 'Invalid time option' })
        }

        Order.aggregate([
            {
                $match: { createdAt: { $gte: dateRangeStart, $lte: currentDate }, status: 'confirm' }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: "$products.brand",
                    totalSale: { $sum: { $multiply: ["$products.salePrice", "$products.quantity"] } }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ], (err, result) => {
            if (err) return res.status(500).json({ message: err })

            Brand.find({}, (err, brands) => {
                if (err) return res.status(500).json({ message: err })

                brands.map(brand => {
                    if (!result.some(item => item._id === brand.name)) {
                        result.push({ _id: brand.name, totalSale: 0 })
                    }
                })

                return res.status(200).json({
                    message: 'Get statistic brand successfully',
                    data: result
                })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    getStatisticOrder,
    getStatisticCategory,
    getStatisticTransaction,
    getStatisticBrand
}