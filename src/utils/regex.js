const regex = {
	username: new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,20}$/im)
}

module.exports = { regex }
