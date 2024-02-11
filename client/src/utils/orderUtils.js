import axios from '../axios'

const createOrder = (order) => {
    return axios.post('order', order)
}

const getOrdersByUser = () => {
    return axios.get('order/my-orders')
}

export {
    createOrder,
    getOrdersByUser
}