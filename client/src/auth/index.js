import Cookies from 'js-cookie'

const checkUserLoggedIn = () => {
    const token = Cookies.get('act') || Cookies.get('rft')
    if (token) {
        try {
            // Perform any additional checks or validations here
            // For example, you can decode the token to extract user information
            // You can also check the token's expiration time or other claims

            return true; // User is logged in
        } catch (error) {
            // Handle any token verification errors
            console.error('Token verification error:', error);
        }
    }

    return false
}

export {
    checkUserLoggedIn
}