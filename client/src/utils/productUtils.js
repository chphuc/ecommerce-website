import axios from '../axios'

const getAllProduct = () => {
    return axios.get('product')
}

const getProductById = (id) => {
    return axios.get('product/' + id)
}

const getSimilarProduct = (id, limit) => {
    return axios.get(`product/similar/${id}?limit=${limit}`)
}

const searchProduct = (name) => {
    return axios.get(`product/search/${name}`)
}

export {
    getAllProduct,
    getProductById,
    getSimilarProduct,
    searchProduct
}