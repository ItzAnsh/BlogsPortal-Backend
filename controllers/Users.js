const express = require("express");
const app = express();
const mongoose = require("mongoose");

const User = require("../_models/UserDetails.model");
const Blog = require("../_models/BlogDetails.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
	let { username, email, password, passwordCheck } = req.body;

	// Validation
	if (!username || !email || !password || !passwordCheck)
		return res.status(400).send({ msg: "Please enter all fields" });
	if (password.length < 6)
		return res
			.status(400)
			.send({ msg: "Password must be atleast 6 characters long" });
	if (password !== passwordCheck)
		return res.status(400).send({ msg: "Passwords do not match" });

	// Check if user already exists
	const ExistingUser = await User.findOne({ email: email });
	// console.log(ExistingUser);
	if (ExistingUser) return res.status(400).send({ msg: "User already exists" });

	// Hash password
	bcrypt.hash(password, 10).then((hashedPassword) => {
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		newUser.save().then((savedUser) => {
			res.json(savedUser);
		});
	});
};

module.exports = { RegisterUser };
