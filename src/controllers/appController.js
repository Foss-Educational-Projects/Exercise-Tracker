// Core Modules
const qs = require('node:querystring')
const url = require('url')

// Utilities
const { regex } = require('./../utils/regex')

// Schemas
const { User } = require('./../schemas/userSchema')
const { Exercise } = require('./../schemas/exerciseSchema')

// Error(Client-Side)
let exerciseError = {
	id: "",
	uname: ""
}
let error;

// Controllers

// Get The Home Page
const getIndexPage = (req, res) => {
	res.render('index.hbs', { unameErr: error, exerciseErr: exerciseError })
}
const getUserById = async (req, res) => {
	let id = req.params._id;
	let data = await User.find({ _id: id })
	if (data.length === 0) {
		res.json({ error: "No Users Found" })
	}
	else {
		res.json({ uname: data[0].uname, _id: data[0]._id })
	}
}
const getExerciseById = async (req, res) => {
	let id = req.params._id;
	let log = req.query.from;
	console.log(log)
	// let data = await User.find({ _id: id })
	// if (data.length !== 0) {
	// 	res.json({ data })
	// }
	// else {
	// 	res.json({ error: "No Records Found" })
	// }

}
const getAllUsers = async (req, res) => {
	let data = await User.find({}, "_id username")
	res.json(data)
	res.end()
}
const createUser = async (req, res) => {
	let uname = await req.body.create_uname;
	if (uname) {
		let user = new User({ uname: uname })
		await user
			.save()
			.then(() => console.log("Saved To Database"))
			.catch((err) => console.error(err))
		let data = await User.find({ uname: uname._id })
		res.json({ data })
	}
	else {
		error = "Username is Empty"
		res.redirect("/")
	}
}
const createExercise = async (req, res) => {
	const dateOptions = {
		year: "numeric",
  		month: "long",
  		day: "numeric"
	}
	const time = new Date().toTimeString().split(" ")[0]
	let dateTime = !req.body.date ? 
					new Date().toLocaleDateString("en-US", dateOptions).toString() : 
					new Date(req.body.date.concat(`T${time}`)).toString()
	let exercise = {
		id: req.body.exercise_id,
		uname: req.body.uname,
		description: req.body.description,
		duration: req.body.duration,
		date: dateTime
	}
	let workout = new Exercise({
		id: exercise.id,
		uname: exercise.uname,
		description: exercise.description,
		duration: exercise.duration,
		date: exercise.date
	})

		let user = new User({ _id: id })
		await workout
			.save()
			.then(() => console.log("Exercise Saved"))
			.catch((err) => console.error(err))
		let data = await Exercise
			.find({ id: workout.id, uname: workout.uname })
		res.json({ data })
	res.end()
	}

module.exports = { 
	getIndexPage, 
	getExerciseById,
	getUserById,
	getAllUsers,
	createUser, 
	createExercise 
}