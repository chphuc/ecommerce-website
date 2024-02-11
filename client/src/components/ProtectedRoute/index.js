import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser } from '../../utils/userUtils'
import { signOut } from '../../utils/authUtils'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/signin')
    }

    useEffect(() => {
        getUser()
            .then()
            .catch(err => handleSignOut())
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute