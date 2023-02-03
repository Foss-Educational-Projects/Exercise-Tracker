const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	id: Number,
	username: String,
	description: String,
	duration: Number,
	date: String
})

const Exercise = mongoose.model('exercises', exerciseSchema)

module.exports = { Exercise }