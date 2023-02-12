// Core Modules

// Utilities
const { regex } = require('./../utils/regex')

// Schemas
const { User } = require('./../schemas/userSchema')
// const { Exercise } = require('./../schemas/exerciseSchema')

// Configs
const { dateOptions } = require('./../configs/date') 

// Error(Client-Side)
let exerciseError = {
	id: "",
	uname: "",
	description: "",
	duration: ""
}
let error;

// Controllers

// Sends The Home Page To Client
const getIndexPage = async (req, res) => {
	await res.render('index.hbs', { unameErr: error, exerciseErr: exerciseError })
}
// Gives Back Users If ID Matches
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

//  Gives All Users As JSON Output
const getAllUsers = async (req, res) => {
	let data = await User.find({}, "_id username")
	res.json(data)
	res.end()
}
// Get Users By Username

const getUserByUsername = async (req, res) => {
	let uname = await req.params.username;
	if (uname) {
		let user = new User({ username: uname })
		await user
			.save()
			.then(() => console.log("Saved To Database"))
			.catch((err) => console.error(err))
		let data = await User.find({ username: uname }, "_id username")
		res.json(data)
	}
	else {
		error = "Username is Empty"
		res.redirect("/")
	}
}

// Gets User Specific Exercises
const getExerciseById = async (req, res) => {
	let id = req.params._id;
	let logQueries = {
		from: req.query.from,
		to: req.query.to,
		limit: req.query.limit
	};
	let data = await User.find({ _id: id })
	
	if (data.length !== 0) {	
		await res.json(data)
	}

	else {
		res.json({ error: "No Records Found" })
	}
}

// Creates a New User
const createUser = async (req, res) => {
	let uname = await req.body.username;
	if (uname) {
		let user = new User({ username: uname })
		await user
			.save()
			.then(() => console.log("Saved To Database"))
			.catch((err) => console.error(err))
		let data = await User.find({ username: uname }, "_id username")
		res.json(data)
	}
	else {
		error = "Username is Empty"
		res.redirect("/")
	}
}
// Redirects The Data From Index Page To Another Page Via POST Request 
const getData = (req, res) => {
	let workout = {
		id: req.body._id,
		uname: req.body.username,
		description: req.body.description,
		duration: req.body.duration,
		date: req.body.date,
	}
	if(!workout.description && !workout.duration){
		!workout.duration ? exerciseError.duration = "Duration Is Empty" : exerciseError.duration = ""
		!workout.description ? exerciseError.description = "Description Is Empty" : exerciseError.description = ""
		res.redirect("/")
	}
	else {
		res.redirect(
			307, 
			`/api/users/${workout.id}/exercises`)
	}
}
// Creates New Exercise For Given Users
const createExercise = async (req, res) => {
	const formDate = await req.body.date;
	const time = new Date().toTimeString().split(" ")[0]
	let dateTime = !formDate || !req.query.date ? 
		new Date().toLocaleDateString("en-US", dateOptions).toString() : 
		new Date(formDate.concat(`T${time}`)).toString()

	let userName = await User.findById({ _id: req.body._id }, " -_id username")

	let exercise = {
		_id: req.params._id || req.body._id,
		username: userName.username,
		description: await req.body.description || req.query.description,
		duration: parseInt(req.body.duration) || parseInt(req.query.duration),
		date: dateTime 
	}
	let user = await User.findById({ _id: exercise._id })

	if (user.length !== 0) {
		await User.findOneAndUpdate(
			{ _id: exercise._id }, 
			{
				$push: {
					log: {
						description: exercise.description, 
						duration: exercise.duration, 
						date: exercise.date
					}
				},

				$set:{
				 	count: user.log.length + 1
				}
			},
			{ new: true }
		)
			.then(() => {
		console.log("Exercise Saved") 
		console.log(exercise)
	})
	.catch((err) => console.error(err))
	res.json(exercise)
	res.end()
	}
	else {
	res.json({ error: `User With ID: ${exercise._id} Doesnt Exist` })
}
}

module.exports = { 
	getIndexPage, 
	getExerciseById,
	getUserById,
	getAllUsers,
	getData,
	createUser, 
	getUserByUsername,
	createExercise 
}