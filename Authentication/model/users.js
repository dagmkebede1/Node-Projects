const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
    username: {type: String, required: ['username must be provided!', true], unique:['username Exist try other name', true]},
    password: {type: String, required:['password is a must', true]}
})
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);