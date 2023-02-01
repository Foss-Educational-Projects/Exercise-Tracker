//  Instances
const express = require('express')
const router = express.Router()

// Controllers
const { 
	getIndexPage, 
	getExerciseById,
	getExerciseByUsername,
	createUser, 
	createExercise
} = require('./../controllers/appController')

//  Routes
router.get("/", getIndexPage)

router.get("/api/users/:_id/logs?[from][&to][&limit]", getExerciseById)

router.get("/api/users/:username/", getExerciseByUsername)

router.post("/api/users", createUser)

router.post("/api/users/:id/exercises", createExercise)

module.exports = router