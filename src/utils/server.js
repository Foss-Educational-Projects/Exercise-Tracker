require('dotenv').config()

const server = () => {
    console.log(`Server Running On ${process.env.HOST}: ${process.env.PORT}`)
}

module.exports = { server }
