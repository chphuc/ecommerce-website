import axios from '../axios'

const getAllBrand = () => {
    return axios.get('brand')
}

const getBrandById = (id) => {
    return axios.get('brand/' + id)
}

const createBrand = (data) => {
    return axios.post('brand', data)
}

const updateBrand = (id, data) => {
    return axios.put('brand/' + id, data)
}
const deleteBrand = (id) => {
    return axios.delete('brand/' + id)
}

export {
    getAllBrand,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}