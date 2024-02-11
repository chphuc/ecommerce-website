import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserById } from '../../utils/UserUtils'
import { signOut } from '../../utils/AuthUtils'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/signin')
    }

    useEffect(() => {
        getUserById()
            .then(res => {
                if (res.data.data.role !== 'admin') handleSignOut()
            })
            .catch(err => handleSignOut())
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute