const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const db = async () => {
	await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`)
}
db().catch((err) => console.error(err))

module.exports = { db }