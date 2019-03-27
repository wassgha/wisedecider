const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const User = new Schema({
  email: String
})

User.plugin(passportLocalMongoose, { usernameField: 'email', usernameQueryFields: ['email'] })

module.exports = mongoose.model('User', User)
