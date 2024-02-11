import axios from '../axios'

const getAllBrand = () => {
    return axios.get('brand')
}

export {
    getAllBrand
}