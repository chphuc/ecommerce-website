import axios from '../axios'

const getAllCategory = () => {
    return axios.get('category')
}

const getQuantityByCategory = (category) => {
    return axios.get('category/quantity/' + category)
}

export {
    getAllCategory,
    getQuantityByCategory
}