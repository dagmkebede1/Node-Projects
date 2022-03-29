const router = require('express').Router()
const { getAllproducts, getProduct } = require('../controler/controlers')


router.route('/products').get(getAllproducts)
router.route('/products/search').get(getProduct)



module.exports = router

