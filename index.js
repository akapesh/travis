const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/userRoutes");
const registerRoutes = require("./routes/registerRoutes");

var PORT = process.env.PORT || 4000;

const session = require("express-session");
const passport = require("passport");

const User = require("./models/registerModel");
const Staff = require("./models/staffModel");
const Customer = require("./models/customerModel");

const server = express();

server.set("view engine", "pug");

server.use(express.static("public"));
server.use("/static", express.static("public"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(passport.initialize());

const uri =
	"mongodb+srv://PatienceA:k4Rjyhna7rWTUiS@cluster0.xpcwq.mongodb.net/bodaboda?retryWrites=true&w=majority";
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB Connected…");
	})
	.catch((err) => console.log(err));

// mongoose.connect(
// 	"mongodb://localhost:27017/bodaboda",
// 	{ useNewUrlParser: true, useUnifiedTopology: true },
// 	function(err) {
// 		if (err) throw err;
// 		console.log("Database connected");
// 	}
// );

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

server.use(
	session({
		secret: "thesecret`",
		resave: true,
		saveUninitialized: false,
	})
);

server.use("/", loginRoutes);
server.use("/register", registerRoutes);
server.use("/user", userRoutes);

server.post("/logout", (req, res) => {
	if (req.session) {
		req.session.destroy(function(err) {
			if (err) {
				// failed to destroy session
			} else {
				return res.redirect("/");
			}
		});
	}
});

server.get("/logout", (req, res) => {
	res.sendFile(path.join(__dirname, "./views", "index.html"));
});

server.get("*", (req, res) => {
	res.render("error");
});

server.listen(PORT, function() {
	console.log("Listening at port 4000");
});
