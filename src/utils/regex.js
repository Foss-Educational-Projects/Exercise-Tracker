const regex = {
	id: new RegExp(/^(_)[0-9]{1,100}/),
	date:new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
	duration: new RegExp(/^[0-9]{1,4}$/gmi),
	username: new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,20}$/im),
	description: new RegExp(/^[0-9A-Za-z]{0,}$/gmi)

}

module.exports = { regex }
