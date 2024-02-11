import axios from '../axios'

const getUser = () => {
    return axios.get('user/me')
}

const updateUser = (data) => {
    return axios.put('user/me', data)
}

const addAddress = (data) => {
    return axios.post('user/address', { ...data })
}

const setDefaultAddress = (id) => {
    return axios.put('user/address/' + id)
}

const deleteAddress = (id) => {
    return axios.delete('user/address/' + id)
}

export {
    getUser,
    updateUser,
    addAddress,
    setDefaultAddress,
    deleteAddress
}