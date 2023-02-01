// Utilities
const { regex } = require('./../utils/regex')

// Schemas
const { User } = require('./../schemas/userSchema')

const getIndexPage = (req, res) => {
	res.render('index.hbs')
}
const getExerciseById = async (req, res) => {
	let exercise = {
		id: req.params.id
	}
}

const createUser = async (req, res) => {
    let uname = await req.body.create_uname;
    let user = new User({ uname: uname })
    await user
    		.save()
    		.then(() => console.log("Saved To MDB"))
    		.catch((err) => console.error(err))

    res.json()
}
const createExercise = async (req, res) => {
	let exercise = {
		id: req.body.id,
		uname: req.body.id,
		description: req.body.id,
		duration: req.body.id,
		date: req.body.id,
	}
}

module.exports = { 
	getIndexPage, 
	getExerciseById,
	getExerciseByUsername,
	createUser, 
	createExercise 
}