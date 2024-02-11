import axios from '../axios'

const signIn = (value) => {
    return axios.post('auth/signin', value)
}

const signUp = (value) => {
    return axios.post('auth/signup', value)
}

const signOut = () => {
    return axios.get('auth/signout')
}

export {
    signIn,
    signUp,
    signOut
}