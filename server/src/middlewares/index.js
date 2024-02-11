import jwt from 'jsonwebtoken'
import User from '../modals/User.js'
import Role from '../modals/Role.js'

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies?.act

    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err || !decoded?.id) {
            const refreshToken = req.cookies?.rft

            if (!refreshToken) return res.status(400).json({ message: 'Unauthorized!', error: err })

            jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
                if (err || !decoded?.id) {
                    return res.status(400).json({ message: 'Unauthorized!', error: err })
                }

                var accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}m`
                })

                res
                    .status(200)
                    .cookie('act', accessToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: true,
                        path: '/',
                        maxAge: process.env.ACCESS_TOKEN_EXPIRESIN * 1000 * 60
                    })
                req.userId = decoded.id
                next()
            })
            return
        }
        req.userId = decoded.id
        next()
    })
}

const isAdmin = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) return res.status(500).json({ message: err })

        Role.findOne({ name: user.role }, (err, role) => {
            if (err) return res.status(500).json({ message: err })

            if (role?.name === 'admin') {
                next()
                return
            }

            res.status(400).json({ message: 'Require Admin role!' })
            return
        })
    })
}

export {
    verifyToken,
    isAdmin
}