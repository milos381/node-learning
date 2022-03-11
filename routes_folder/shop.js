const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/create-order', shopController.postOrder)

router.get('/orders', shopController.getOrders);

router.post('/cart-delete-item', shopController.postCartDeleteProduct)



// router.get('/', (req, res, next) => {
//     const products = adminData.products;
//     res.render('shop', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     //   hasProducts: products.length > 0,
//     //   activeShop: true,
//     //   productCSS: true
//     });
// });



module.exports = router;