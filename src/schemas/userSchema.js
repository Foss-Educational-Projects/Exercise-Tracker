const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	description: String,
	duration: Number,
	date: String
}, { _id: false })

const userSchema = new mongoose.Schema({
	username: String,
	count: Number,
	log: [exerciseSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = { User }