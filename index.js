const express = require("express");
const app = express();
const port = 3000;
const UserRoutes = require("./Routes/User.route");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());

// console.log(typeof process.env.MONGODB_URI);
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected");
	})
	.catch((e) => {
		console.log(`DB_CONNECTION_ERROR: ${e}`);
	});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/users", UserRoutes);

app.listen(port, () => {
	console.log(`running on port ${port}`);
});
