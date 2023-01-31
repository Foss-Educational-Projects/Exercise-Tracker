const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	uname: String
})

const User = mongoose.model('users', userSchema)

module.exports = { User }