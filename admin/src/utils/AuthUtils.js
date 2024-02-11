import axios from '../axios'

const signIn = (data) => {
    return axios.post('auth/signin', data)
}

const signUp = (data) => {
    return axios.post('auth/signup', data)
}

const signOut = () => {
    return axios.get('auth/signout')
}

export {
    signIn,
    signUp,
    signOut
}