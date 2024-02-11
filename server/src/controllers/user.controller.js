import User from '../modals/User.js'
import bcrypt from 'bcrypt'

const findAll = (req, res) => {
    try {
        User.find({}, (err, users) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({ message: 'Get users successfully', data: users })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findOne = (req, res) => {
    try {
        User.findById(req.userId, (err, user) => {
            if (err) return res.status(500).json({ message: err })
            if (!user) return res.status(400).json({ message: 'User not found' })

            user.password = ''
            return res.status(200).json({ message: 'Get user successfully', data: user })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findUserByAdmin = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'userId is required' })

    try {
        User.findById(id, (err, user) => {
            if (err) return res.status(500).json({ message: err })
            if (!user) return res.status(400).json({ message: 'User not found' })

            user.password = ''
            return res.status(200).json({ message: 'Get user successfully', data: user })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const update = (req, res) => {
    const { firstName, lastName, phone } = req.body
    if (!firstName || !lastName || !phone) return res.status(400).json({ message: 'All data is required' })

    try {
        User.findByIdAndUpdate(req.userId, { firstName, lastName, phone }, (err, user) => {
            if (err) return res.status(500).json(err)
            if (!user) return res.status(400).json({ message: 'User not found' })

            return res.status(200).json({
                message: 'Update user successfully',
                data: user
            })
        })
    } catch (err) {
        return res.status(501).json(err)
    }
}

const updateUserByAdmin = (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'userId is required' })

    const { firstName, lastName, phone } = req.body
    if (!firstName || !lastName || !phone) return res.status(400).json({ message: 'All data is required' })

    try {
        User.findByIdAndUpdate(id, { firstName, lastName, phone }, (err, user) => {
            if (err) return res.status(500).json(err)
            if (!user) return res.status(400).json({ message: 'User not found' })

            return res.status(200).json({
                message: 'Update user successfully',
                data: user
            })
        })
    } catch (err) {
        return res.status(501).json(err)
    }
}

const addAddress = (req, res) => {
    const { province, district, village, specificAddress } = req.body
    if (!province || !district || !village || !specificAddress) return res.status(400).json({ message: 'All fields are required' })

    try {
        User.findById(req.userId, (err, user) => {
            if (err) return res.status(500).json(err)
            if (!user) return res.status(400).json({ message: 'User not found' })

            // Just push when addresses empty
            if (!user.address.length) {
                user.address.push({
                    defaultAddress: true,
                    province,
                    district,
                    village,
                    specificAddress
                })

                user.save((err) => {
                    if (err) return res.status(500).json(err)

                    return res.status(200).json({ message: 'Add address successfully' })
                })
            } else {
                const addressExists = user.address.some(
                    (item) =>
                        item.province === province &&
                        item.district === district &&
                        item.village === village &&
                        item.specificAddress === specificAddress
                )
                if (addressExists) return res.status(400).json({ message: 'Address already exists' })

                if (req.body.defaultAddress) {
                    user.address = user.address.map(item => ({ ...item, defaultAddress: false }))
                }

                user.address.push({
                    defaultAddress: req.body.defaultAddress || false,
                    province,
                    district,
                    village,
                    specificAddress
                })

                user.save((err) => {
                    if (err) return res.status(500).json(err)

                    return res.status(200).json({ message: 'Add address successfully' })
                })
            }

        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const setDefaultAddress = (req, res) => {
    const { id } = req.params
    try {
        User.findById(req.userId, (err, user) => {
            if (err) return res.status(500).json(err)
            if (!user) return res.status(400).json({ message: 'User not found' })

            const addressExists = user.address.some(item => {
                return item._id.toString() === id
            })
            if (!addressExists) return res.status(400).json({ message: 'Address not found' })

            user.address = user.address.map(
                item =>
                    item._id.toString() === id ?
                        { ...item, defaultAddress: true } :
                        { ...item, defaultAddress: false }
            )

            user.save((err) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json({ message: 'Set default address successfully' })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteAddress = (req, res) => {
    const { id } = req.params
    try {
        User.findById(req.userId, (err, user) => {
            if (err) return res.status(500).json(err)
            if (!user) return res.status(400).json({ message: 'User not found' })

            const indexAddress = user.address.findIndex(item => item._id.toString() === id)
            if (indexAddress == -1) return res.status(400).json({ message: 'Address not found' })

            if (user.address[indexAddress].defaultAddress && user.address.length > 1) {
                user.address = user.address.filter(item => item._id.toString() !== id)
                user.address[0].defaultAddress = true
            } else {
                user.address = user.address.filter(item => item._id.toString() !== id)
            }

            user.save((err) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json({ message: 'Delete address successfully' })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const changePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'All fields are required' })

    try {
        User.findById(req.userId, (err, user) => {
            if (err) return res.status(500).json(err)
            if (!user) return res.status(400).json({ message: 'User not found' })

            const isCorrectPassword = bcrypt.compareSync(currentPassword, user.password)
            if (!isCorrectPassword) return res.status(400).json({ message: 'Password is incorrect' })

            user.password = bcrypt.hashSync(newPassword, 10)
            user.save((err) => {
                if (err) return res.status(500).json(err)

                return res.status(200).json({ message: 'Change password successfully' })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    findAll,
    findOne,
    findUserByAdmin,
    update,
    updateUserByAdmin,
    addAddress,
    setDefaultAddress,
    deleteAddress,
    changePassword
}