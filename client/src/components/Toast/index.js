import toast from 'react-hot-toast'

const notifyError = (str) => toast.error(str)
const notifySuccess = (str) => toast.success(str)

export {
    notifyError,
    notifySuccess
}