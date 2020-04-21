const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var registerSchema = new mongoose.Schema({
	userName: String,
	email: String,
	role: String,
});

registerSchema.plugin(passportLocalMongoose, { usernameField: "userName" });

module.exports = mongoose.model("User", registerSchema);
