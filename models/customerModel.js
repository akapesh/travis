const mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	phone: String,
	dob: Date,
	nin: String,
	nation: String,
	status: String,
	reffname: String,
	reflname: String,
	refphone: String,
	refdob: Date,
	refwork: String,
	lc1: String,
	lc3: String,
	stage: String,
	ride: String,
	downpay: String,
	otherloan: String,
	file: String,
});

module.exports = mongoose.model("Customer", customerSchema);
