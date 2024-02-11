import axios from '../axios'

const getAllUser = () => {
    return axios.get('user')
}

const getUserById = () => {
    return axios.get('user/me')
}

const getUserByAdmin = (id) => {
    return axios.get('user/admin/' + id)
}

const updateUserById = (data) => {
    return axios.put('user/me', data)
}

const updateUserByAdmin = (id, data) => {
    return axios.put('user/admin/' + id, data)
}

const changePassword = (data) => {
    return axios.post('user/change-password', data)
}

export {
    getUserById,
    getAllUser,
    getUserByAdmin,
    updateUserById,
    updateUserByAdmin,
    changePassword
}