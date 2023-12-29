const express = require("express");
const router = express.Router();
const User = require("../_models/UserDetails.model");
const Blog = require("../_models/BlogDetails.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { RegisterUser } = require("../controllers/Users");

router.post("/login", (req, res) => {
	let { email, password } = req.body;

	if (!email || !password)
		return res.status(400).send({ msg: "Please enter all fields" });

	const ActualUser = User.findOne({ email: email });
	// If user not found send error message
	if (!ActualUser) return res.status(400).send({ msg: "User does not exist" });

	// Validate password
	bcrypt.compare(password, ActualUser.password).then((isMatch) => {
		if (!isMatch) return res.status(400).send({ msg: "Invalid credentials" });

		jwt.sign(
			{ id: ActualUser.id },
			process.env.JWT_SECRET,
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				res.json({
					token,
					user: {
						id: ActualUser.id,
						username: ActualUser.username,
						email: ActualUser.email,
					},
				});
			}
		);
	});
});

router.post("/register", RegisterUser);

router.get("/user", (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then((user) => res.json(user));
});

router.get("/user/:id", (req, res) => {
	User.findById(req.params.id)
		.select("-password")
		.then((user) => res.json(user));
});

// export these routes
module.exports = router;
