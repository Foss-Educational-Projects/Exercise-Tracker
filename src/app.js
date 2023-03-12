// Dependencies
require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const hbs = require('hbs')
const handlebars = require('express-handlebars')

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
hbs.registerPartials(path.join(__dirname, "/views/partials/"))
app.engine('handlebars', handlebars.engine(hbsConfig))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '../public')))

// Routes
router.use("/", appRoute);
app.use(router)

// Server
app.listen(process.env.PORT, server(db))
