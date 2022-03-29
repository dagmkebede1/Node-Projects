require('dotenv').config()
const mongoose = require('mongoose')



const DBconnect = (url) => {
     mongoose.connect(url)
    
}




module.exports = DBconnect

