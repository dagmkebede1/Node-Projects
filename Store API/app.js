require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/routes')
const notFound = require('./middleware/notFound')


const app = express()
app.use(express.json())
app.use('/api', route)
app.use('', notFound)




const start =async () => {
    try {  
        await mongoose.connect(process.env.MONGO).then(console.log('DB conected!'))
        app.listen(process.env.PORT, console.log(`backend server is running on port: ${process.env.PORT}`))
    } catch (error) {
        console.log(error);
    }
}



start()