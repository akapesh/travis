const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/registerModel");
const Staff = require("../models/staffModel");
const Customer = require("../models/customerModel");
const permissions = require("../permissions");
const passport = require("passport");

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.post("/", async (req, res) => {
	try {
		//instance of the model User & save to return the content in the body
		var user = new User(req.body);
		//console.log(req.body);
		//after this is done the save returns a promise
		//to save you require User from the model
		await User.register(user, req.body.password, (err) => {
			if (err) {
				throw err;
			}
			res.redirect("/");
		});
	} catch (error) {
		res.status(400).send("unable to save to database");
	}
});

router.post("/delete", async (req, res) => {
	try {
		await Staff.deleteOne({ _id: req.body.id });
		res.redirect("back");
	} catch (error) {
		res.status(400).send("unable to delete from database");
	}
});

router.post("/delete2", async (req, res) => {
	try {
		await Customer.deleteOne({ _id: req.body.id });
		res.redirect("back");
	} catch (error) {
		res.status(400).send("unable to delete from database");
	}
});

// router.post("/update", async (req, res) => {
// 	if (req.session.user) {
// 		try {
// 			//console.log(req.body);
// 			const updateduser = await User.findOneAndUpdate(
// 				{ _id: req.session.staff._id },
// 				req.body
// 			);
// 			//console.log(updateduser.role);
// 			const role = permissions[updateduser.role];
// 			//console.log(role.homepage);
// 			res.redirect("/user/staffList");
// 		} catch (error) {
// 			res.status(400).send("unable to update to database");
// 		}
// 	} else {
// 		res.redirect("/user/staffReg");
// 	}
// });

module.exports = router;
