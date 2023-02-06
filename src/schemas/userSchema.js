const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: String,
	count: Number,
	logs: [
			{
				description: String,
				duration: Number,
				date: String
			}
	]
})

const User = mongoose.model('User', userSchema)

module.exports = { User }