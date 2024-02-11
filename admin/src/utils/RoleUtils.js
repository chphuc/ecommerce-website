import axios from '../axios'

const getRoles = () => {
    return axios.get('role')
}

export {
    getRoles
}