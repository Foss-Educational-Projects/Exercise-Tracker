//  Instances
const express = require('express')
const router = express.Router()

// Controllers
const { 
	getIndexPage, 
	createUser, 
	createExercise,  
	getExerciseById,
	getExerciseByUsername
} = require('./../controllers/appController')

//  Routes
router.get("/", getIndexPage)

router.get("/api/users/:_id/logs?[from][&to][&limit]", getExerciseById)

router.get("/api/users/:username/")

router.post("/api/users", createUser)

router.post("/api/users/:id/exercises", createExercise)

module.exports = router