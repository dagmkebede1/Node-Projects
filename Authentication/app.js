require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require('passport-local-mongoose')

const router = require('./route/routes')
const connectDB = require('./DB/Connect')

const app = express()
app.use(express.json())


app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
})
)
app.use(passport.initialize())
app.use(passport.session())


app.use('/register', router)
app.use('/login', router)
app.use('/secret', router)


const start = async()=>{
    await connectDB(process.env.MONGO)
    app.listen(process.env.PORT, console.log('server started...'))

}
start()
