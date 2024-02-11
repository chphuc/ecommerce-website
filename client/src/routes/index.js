import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import CheckOut from '../pages/CheckOut'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import AccountInfomation from '../pages/AccountInfomation'
import AccountAddress from '../pages/AccountAddress'
import AccountOrder from '../pages/AccountOrder'

import DefaultLayout from '../layouts/DefaultLayout'
import AccountLayout from '../layouts/AccountLayout'
import Login from '../layouts/LoginLayout'

const route = {
    home: '/',
    signIn: '/signin',
    signUp: '/signup',
    products: '/products',
    product: '/product/',
    checkout: '/checkout',
    accountInfomation: '/account/information',
    acccountAddress: '/account/address',
    accountOrder: '/account/order'
}

const publicRoutes = [
    { path: route.home, component: <Home />, layout: DefaultLayout },
    { path: route.signIn, component: <SignIn />, layout: Login },
    { path: route.signUp, component: <SignUp />, layout: Login },
    { path: route.products, component: <Products />, layout: DefaultLayout },
    { path: route.product + ':id', component: <ProductDetail />, layout: DefaultLayout },
]

const privateRoutes = [
    { path: route.checkout, component: <CheckOut />, layout: DefaultLayout },
    {
        path: route.accountInfomation,
        component:
            <AccountLayout>
                <AccountInfomation />
            </AccountLayout>,
        layout: DefaultLayout
    },
    {
        path: route.acccountAddress,
        component:
            <AccountLayout>
                <AccountAddress />
            </AccountLayout>,
        layout: DefaultLayout
    },
    {
        path: route.accountOrder,
        component:
            <AccountLayout>
                <AccountOrder />
            </AccountLayout>,
        layout: DefaultLayout
    },
]

export { route, publicRoutes, privateRoutes }