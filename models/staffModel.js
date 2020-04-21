const mongoose = require("mongoose");

var staffSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	uname: String,
	email: String,
	phone: String,
	currdate: Date,
	workid: String,
	days: String,
	role: String,
});

module.exports = mongoose.model("Staff", staffSchema);
