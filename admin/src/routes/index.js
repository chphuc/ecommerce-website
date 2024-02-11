import DefaultLayout from "../layouts/DefaultLayout"
import LoginLayout from "../layouts/LoginLayout"

import signIn from "../pages/SignIn"
import signUp from "../pages/SignUp"
import ProductManagement from '../pages/Product/ProductManagement'
import ProductCaregory from "../pages/Product/ProductCaregory"
import ProductCreate from "../pages/Product/ProductCreate"
import orders from '../pages/Order'
import orderDetail from '../pages/OrderDetail'
import customers from '../pages/Customer'
import statistics from '../pages/Statistic'
import setting from '../pages/Setting'

const publicRoutes = [
    { path: "/signin", component: signIn, layout: LoginLayout },
    { path: "/signup", component: signUp, layout: LoginLayout },
]

const privateRoutes = [
    { path: "/", component: statistics, layout: DefaultLayout },
    { path: "/products/management", component: ProductManagement, layout: DefaultLayout },
    { path: "/products/caregories", component: ProductCaregory, layout: DefaultLayout },
    { path: "/products/add", component: ProductCreate, layout: DefaultLayout },
    { path: "/orders", component: orders, layout: DefaultLayout },
    { path: "/orders/:id", component: orderDetail, layout: DefaultLayout },
    { path: "/customers", component: customers, layout: DefaultLayout },
    { path: "/statistics", component: statistics, layout: DefaultLayout },
    { path: "/setting", component: setting, layout: DefaultLayout },
]

export { publicRoutes, privateRoutes }