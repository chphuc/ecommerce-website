import axios from '../axios'

const getAllOrder = () => {
    return axios.get('order/admin/all-orders')
}

const getUserOrders = (id) => {
    return axios.get('order/admin/user-orders/' + id)
}

const getUserOrderById = (id) => {
    return axios.get('order/admin/' + id)
}

const confirmOrder = (id) => {
    return axios.put('order/admin/confirm/' + id)
}

const declineOrder = (id, declineReason) => {
    return axios.put('order/admin/decline/' + id, { declineReason })
}


export {
    getAllOrder,
    getUserOrderById,
    confirmOrder,
    declineOrder,
    getUserOrders
}