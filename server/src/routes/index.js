import authRoute from './auth.route.js'
import userRoute from './user.route.js'
import productRoute from './product.route.js'
import orderRoute from './order.route.js'
import cartRoute from './cart.route.js'
import categoryRoute from './category.route.js'
import brandRoute from './brand.route.js'
import statusRoute from './status.route.js'
import roleRoute from './role.route.js'
import statisticRoute from './statistic.route.js'

export default app => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        )
        next()
    })

    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/product', productRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/cart', cartRoute)
    app.use('/api/category', categoryRoute)
    app.use('/api/brand', brandRoute)
    app.use('/api/status', statusRoute)
    app.use('/api/role', roleRoute)
    app.use('/api/statistic', statisticRoute)
}
