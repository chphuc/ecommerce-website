import axios from '../axios'

const getStatisticOrder = (timeOption) => {
    return axios.get('/statistic/order/' + timeOption)
}

const getStatisticCategory = (timeOption) => {
    return axios.get('/statistic/category/' + timeOption)
}

const getStatisticTransaction = (timeOption) => {
    return axios.get('/statistic/transaction/' + timeOption)
}

const getStatisticBrand = (timeOption) => {
    return axios.get('/statistic/brand/' + timeOption)
}

export {
    getStatisticOrder,
    getStatisticCategory,
    getStatisticTransaction,
    getStatisticBrand
}