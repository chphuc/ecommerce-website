import axios from '../axios'

const getAllProduct = () => {
    return axios.get('product')
}

const getProductById = (id) => {
    return axios.get('product/' + id)
}

const createProduct = (data) => {
    return axios.post('product', data)
}

const updateProduct = (id, data) => {
    return axios.put('product/' + id, data)
}

const deleteProduct = (id) => {
    return axios.delete('product/' + id)
}

export {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}