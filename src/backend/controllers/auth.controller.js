const express = require("express");
const router = express.Router();

const authModel = require("../models/auth.model");

router.post("/", async (req, res) => {
	const credential = req.body;

	try {
		res.json({
			message: "Successfully sign in",
			token: await authModel.authenticate(credential),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: "Failed to sign in",
			detail: err,
		});
	}
});

router.get("/authToken", async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	try {
		res.status(200).json({
			status: 200,
			message: "Token is valid",
			data: await authModel.authToken(token),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: "Token is not valid",
			detail: err,
		});
	}
});

module.exports = router;
