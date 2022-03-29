require('dotenv').config()
const DBconnect = require('../DB/connection')
const products = require('../models/products')
const listof_products = require('../product.json')


const addproducts = async (req, res) => {
    try {
        await DBconnect('mongodb://localhost:27017/shopDB')
        await products.deleteMany()
        await products.create(listof_products)
        console.log('content added!');
        
    } catch (error) {
        console.log(error)
    }
}
addproducts()