//  Instances
const express = require('express')
const router = express.Router()

// Controllers
const { 
	getIndexPage, 
	getUserById,
	getAllUsers,
	getExerciseById,
	createUser, 
	createExercise
} = require('./../controllers/appController')

//  Routes
router.get("/", getIndexPage) // Finished
router.get("/api/users", getAllUsers) // Finished
router.get("/api/users/:_id", getUserById) // Finished

router.get("/api/users/:_id/logs", getExerciseById)

// router.get("/api/users/:username/", getExerciseByUsername)


router.post("/api/users", createUser) // Finished
router.post("/api/users/:_id/exercises", createExercise) // Finished

module.exports = router;