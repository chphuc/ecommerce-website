import axios from '../axios'

const getStatus = () => {
    return axios.get('status')
}

export {
    getStatus
}