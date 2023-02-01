// Utilities
const { regex } = require('./../utils/regex')

// Schemas
const { User } = require('./../schemas/userSchema')

const getIndexPage = (req, res) => {
	res.render('index.hbs')
}
const getExerciseById = async (req, res) => {
	let id = req.params._id;
	let data = await User.find({_id: id})
	if(data.length !== 0){
		res.json({ data })
	}
	else {
		res.json({error: "No Records Found"})
	}

}
const getExerciseByUsername = async (req, res) => {
	const uname = req.params.username;
	let data = await User.find({uname: uname})
	if(data.length !== 0) {
		res.json({ data })
	}
	else {
		res.json({error: "No Records Found"})
	}
}
const createUser = async (req, res) => {
    let uname = await req.body.create_uname;
    let user = new User({ uname: uname })
    await user
    		.save()
    		.then(() => console.log("Saved To MDB"))
    		.catch((err) => console.error(err))
    let data = await User.find({uname: uname })
    res.json({data})
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