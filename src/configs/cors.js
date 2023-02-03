require('dotenv').config()

const corsConfig = {
	origin: function (origin, callback) {
	    if (whiteList.indexOf(origin) !== -1) {
	      callback(null, true)
	    } else {
	      callback(new Error('Not Allowed By CORS'))
	    }
 	} 
}

module.exports = { corsConfig }