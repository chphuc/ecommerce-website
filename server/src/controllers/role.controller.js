import Role from '../modals/Role.js'

const initRole = async (req, res) => {
    try {
        const existUserRole = await Role.findOne({ name: 'user' })
        if (!existUserRole) {
            new Role({ name: 'user' })
                .save(err => {
                    if (err) console.log(err)

                    console.log('Added user to roles collection')
                })
        }
        const existAdminRole = await Role.findOne({ name: 'admin' })
        if (!existAdminRole) {
            new Role({ name: 'admin' })
                .save(err => {
                    if (err) console.log(err)

                    console.log('Added admin to roles collection')
                })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findAll = (req, res) => {
    try {
        Role.find({}, (err, roles) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get roles successfully',
                data: roles
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}


export default {
    initRole,
    findAll
}