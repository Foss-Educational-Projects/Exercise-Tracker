// Dependencies
require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const hbs = require('express-handlebars')

// Instances
const app = express()
const router = express.Router();

// Modules
const { db } = require('./utils/db')
const { server } = require('./utils/server')

// Routes
const appRoute = require('./routes/appRoute')

// Configurations
const { hbsConfig } = require('./configs/hbsConfig')

// Settings
app.engine('handlebars', hbs.engine(hbsConfig))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.use(cors())
app.use(router)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
router.use("/", appRoute);

// Server
app.listen(process.env.PORT, server(db))
