const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const errorController = require('./controllers/error')
// app.set('view engine', 'pug')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

app.set('view engine', 'ejs')
// app.set('views', 'views') this is unecessary if we are using views folder naming 

const adminRoutes = require('./routes_folder/admin')
const shopRoutes = require('./routes_folder/shop')

// db.execute('SELECT * FROM products')
// .then((result) => {
//     console.log(result[0], result[1])
// })
// .catch((err) => {
//     console.log(err)
// })

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => {console.log(err)})
})

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User) //not necessary
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})

// sequelize.sync({force: true}) //to force change after editing table
sequelize.sync()
.then(result => {
    return User.findByPk(1)
    // console.log(result)
})
.then( user => {
    if(!user){
        return User.create({ name: 'MAX', email: "max@test.com"})
    }
    // return Promise.resolve(user)  <- this can be ommited, but since the above returns promise
    // we can make sure that we will return the promise here as well (if we are not sure)
    // but if we have another .then, then we can covert it to promise there
    return user
})
.then( user => {
    return user.createCart()
})
.then( cart => {
    app.listen(3000)
})
.catch(err => {console.log(err)})
