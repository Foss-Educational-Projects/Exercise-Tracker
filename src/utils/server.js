require('dotenv').config()
const server = (db) => {
    console.log(`Server Running On ${process.env.HOST}:${process.env.PORT}`)
    if(db){
        console.log('Database Connection Established')
    }
}

module.exports = { server }
