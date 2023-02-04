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
	uname: ""
}
let error;

// Controllers

// Sends The Home Page To Client
const getIndexPage = (req, res) => {
	res.render('index.hbs', { unameErr: error, exerciseErr: exerciseError })
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
		res.json({ data })
	}
	else {
		res.json({ error: "No Records Found" })
	}
}

//  Gives All Users As JSON Output
const getAllUsers = async (req, res) => {
	let data = await User.find({}, "_id username")
	res.json(data)
	res.end()
}

// Creates a New User
const createUser = async (req, res) => {
	let uname = await req.body.create_uname;
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

// Creates New Exercise For Given Users
const createExercise = async (req, res) => {
	const formDate = await req.body.workout_date;
	const time = new Date().toTimeString().split(" ")[0]
	let dateTime = !formDate ? 
		new Date().toLocaleDateString("en-US", dateOptions).toString() : 
		new Date(formDate.concat(`T${time}`)).toString()

	let exercise = {
		id: req.params._id,
		description: await req.body.workout_description,
		duration: await req.body.workout_duration,
		date: dateTime
	}

	let user = await User.find({ _id: exercise.id })
	if (user.length !== 0) {
		await User.findOneAndUpdate(
			{ _id: exercise.id }, 
			{
				$push: {
					logs: {
						description: exercise.description, 
						duration: exercise.duration, 
						date: exercise.date
					}
				}
			},
			{ new: true }
		)
			.then(() => {
				console.log("Exercise Saved") 
				console.log(exercise)
			})
			.catch((err) => console.error(err))
		let data = await User.find({ _id: exercise.id })
		res.json(data)
		res.end()
	}
	else {
		res.json({ error: `User With ID: ${exercise.id} Doesnt Exist` })
	}
}

module.exports = { 
	getIndexPage, 
	getExerciseById,
	getUserById,
	getAllUsers,
	createUser, 
	createExercise 
}