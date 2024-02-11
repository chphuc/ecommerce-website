import User from '../modals/User.js'
import Role from '../modals/Role.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const signIn = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) return res.status(400).json({ message: 'All fields are required' })

    try {
        User.findOne({ userName: userName }, (err, user) => {
            if (err) return res.status(500).json({ message: err })
            if (!user) return res.status(400).json({ message: 'Username not found' })

            const isCorrectPassword = bcrypt.compareSync(password, user.password)
            if (!isCorrectPassword) return res.status(400).json({ message: 'Password is incorrect' })

            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_KEY, {
                expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}m`
            })
            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY, {
                expiresIn: `${process.env.REFRESH_TOKEN_EXPIRESIN}m`
            })

            res
                .status(200)
                .cookie('act', accessToken, {
                    httpOnly: false,
                    sameSite: 'strict',
                    secure: true,
                    path: '/',
                    maxAge: process.env.ACCESS_TOKEN_EXPIRESIN * 1000 * 60
                })
                .cookie('rft', refreshToken, {
                    httpOnly: false,
                    sameSite: 'strict',
                    secure: true,
                    path: '/',
                    maxAge: process.env.REFRESH_TOKEN_EXPIRESIN * 1000 * 60
                })

            return res.status(200).json({ message: 'Signin successfully', data: accessToken })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const signUp = (req, res) => {
    const { email, userName, firstName, lastName, password, role } = req.body
    if (!email || !userName || !firstName || !lastName || !password || !role)
        return res.status(400).json({ message: 'All fields are required' })
    if (!/^\S+@\S+\.\S+$/.test(email))
        return res.status(400).json({ message: 'Invalid email format' })

    try {
        User.findOne({ $or: [{ email: email }, { userName: userName }] }, (err, user) => {
            if (err) return res.status(500).json({ message: err })
            if (user) {
                const existingField = user.email === email ? 'Email' : 'Username'
                return res.status(400).json({ message: `${existingField} already exists` })
            }

            Role.findOne({ name: role }, (err, role) => {
                if (err) return res.status(500).json({ message: err })
                if (!role) return res.status(400).json({ message: 'Role not found' })

                const newUser = new User({
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10)
                })
                newUser.save((err) => {
                    if (err) return res.status(500).json({ message: err })
                    return res.status(200).json({ message: 'Create user successfully' })
                })
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const signOut = async (req, res) => {
    res
        .clearCookie("act")
        .clearCookie("rft")
        .status(200)
        .json({ message: "Signout successfully" })
}

export default {
    signIn,
    signUp,
    signOut
}