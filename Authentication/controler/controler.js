const User = require('../model/users')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const { redirect } = require('express/lib/response')



passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
const regiview = (req, res)=>{
res.status(200).json({msg: 'register page!'})
}

const Regitask = (req, res)=>{
User.register({username: req.body.username}, req.body.password, (err, user)=>{
    if(err){
        console.log(err)
        res.redirect('/register')
    }else{
        passport.authenticate("local")(req, res, ()=>{
            res.redirect('/sectret')
        })
    }
})
}
const logview = (req, res)=>{
    res.status(200).json({msg: 'log in page'})
}
const logtask = (req, res)=>{
const user = new User({
    username: req.body.username,
    password: req.body.password
})
req.login(user, (err)=>{
    if(err){
        console.log(err)
        res.redirect('/login')
    }else{
        passport.authenticate("local")(req, res, ()=>{
            res.redirect('/secret')
        })
    }
})
 
}
const secret = (req, res)=>{
    if (req.isAuthenticated()){
        res.status(200).json({msg: 'you are authonticated!'})
    }else{
        res.status(401).json({msg: 'not authorized!'})
    }
}


module.exports = {Regitask, logtask, secret, logview, regiview}