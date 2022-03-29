const { query } = require('express')
const mongoose = require('mongoose')
const products = require('../models/products')



const getAllproducts = async (req, res) => {

    const data = await products.find()
    res.status(200).json({data, nbHits: data.length})
}

const getProduct = async (req, res) => {
    const { featured, company, name, sort, field, numericFilter } = req.query
    queryObject = {}
    //fiter by featured
    if (featured) {
        queryObject.featured = featured === 'true'? true: false
    }
    //filter by a company
    if (company) {
        queryObject.company = company
    }
    //search by a name
    if (name) {
        queryObject.name = {$regex: name, $options:'i'}
    }
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
            
        });


    }

    let result = products.find(queryObject)
    //sort by alfabetical string(name, company) and nubers(price)
    if (sort) {
        const sortlist = sort.split(',').join(' ');
        result = result.sort(sortlist)
    } else {
        result = result.sort('createdAt')
    }
    //select the elements to apper from the filter
    if (field) {
        const fieldlist = field.split(',').join(' ');
        result = result.select(fieldlist)
    }
    //page number is an input from client and default 1
    //limit is how many items to apper on the single page
    //skip is also an input from the client it helps to skip items per the pages
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    console.log(queryObject);
    const data = await result
    
    res.status(200).json({ data, nbHits: data.length })
    
}
const notFound = (req, res) => {
    res.status(404).json({msg: 'Route not found!'})
}


module.exports = { getAllproducts, getProduct, notFound }