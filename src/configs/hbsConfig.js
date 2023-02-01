const path = require('path')
const hbs = require('express-handlebars')

const hbsConfig = hbs.create({
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    encoding: 'utf8',
    extname: '.hbs',
    defaultLayout: 'index'
})

module.exports = { hbsConfig }