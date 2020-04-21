const express = require("express");
const router = express.Router();
const path = require("path");
const server = express();
const User = require("../models/registerModel");
const Customer = require("../models/customerModel");
const Staff = require("../models/staffModel");
const passport = require("passport");

//Routes when user logs in as sales executive

router.get("/adminhome", (req, res) => {
	res.render("adminhome", { name: req.query.user });
});
// router.get("/adminhome", async (req, res) => {
// 	if (req.session.user) {
// 		try {
// 			let userItem = await User.findById(req.session.user._id);
// 			res.render("adminhome", { name: req.query.user });
// 		} catch {
// 			res.status(500).send("unable to find items in the database");
// 		}
// 	} else {
// 		res.redirect("/");
// 	}
// });

router.get("/staffReg", async (req, res) => {
	if (req.session.user) {
		try {
			res.render("staffReg");
		} catch {
			res.status(500).send("Unable to display staff register");
		}
	} else {
		res.redirect("/");
	}
});

router.post("/staffList", async (req, res) => {
	try {
		let staff = await new Staff(req.body);
		//console.log(staff);
		staff.save();
		res.redirect("/user/staffReg");
	} catch (err) {
		res.status(404).send("Failed to save to the database");
	}
});

router.get("/staffList", async (req, res) => {
	if (req.session.user) {
		//finds all the items in the db
		try {
			let staff = await Staff.find();
			//console.log(Staff);

			if (req.query.fname) {
				staff = await Staff.find({ fname: req.query.fname });
			}
			res.render("staffList", { staffs: staff });

			//list is a pug file that will display
			//users is just a variable name that will parse over the items in the db
		} catch (error) {
			res.status(400).send("Unable to find items in the database");
		}
	} else {
		res.redirect("/user/staffReg");
	}
	//res.render("staffList");
});

//Routes when user logs in as sales executive

router.get("/staffhome", (req, res) => {
	res.render("staffhome", { name: req.query.user });
});

router.get("/customerReg", async (req, res) => {
	if (req.session.user) {
		try {
			//res.sendFile(path.join(__dirname, "../views", "customerReg.html"));
			res.render("customerReg");
		} catch {
			res.status(500).send("Unable to display customer register");
		}
	} else {
		res.redirect("/");
	}
});

router.post("/customerList", async (req, res) => {
	try {
		let customer = await new Customer(req.body);
		//console.log(customer);
		customer.save();
		res.redirect("/user/customerReg");
	} catch (err) {
		res.status(404).send("Failed to save to the database");
	}
});

router.get("/customerList", async (req, res) => {
	if (req.session.user) {
		//finds all the items in the db
		try {
			let customer = await Customer.find();
			//console.log(Staff);

			if (req.query.fname) {
				customer = await Customer.find({ fname: req.query.fname });
			}
			res.render("customerList", { customers: customer });

			//list is a pug file that will display
			//users is just a variable name that will parse over the items in the db
		} catch (error) {
			res.status(400).send("Unable to find items in the database");
		}
	} else {
		res.redirect("/user/staffReg");
	}
	//res.render("staffList");
});

module.exports = router;
