import axios from '../axios'

const getAllCategory = () => {
    return axios.get('category')
}

const getCategoryById = (id) => {
    return axios.get('category/' + id)
}

const createCategory = (data) => {
    return axios.post('category', data)
}

const updateCategory = (id, data) => {
    return axios.put('category/' + id, data)
}

const deleteCategory = (id) => {
    return axios.delete('category/' + id)
}

export {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}