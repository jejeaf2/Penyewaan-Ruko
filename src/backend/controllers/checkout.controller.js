const express = require("express");
const router = express.Router();

const checkoutModel = require("../models/checkout.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get all check out data",
			data: await checkoutModel.getAll(req.query),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get all check out data",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get check out data",
			data: await checkoutModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get check out data",
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	/*
        dari user nerima:
        - roomId
        - checkinId
        - totalPrice
        - repayment
        - change
        - late

        dari backend olah:
        - userInCharge
        - checkOutDate
    */
	let { roomId, ...payload } = req.body;

	payload["userInCharge"] = req.user.username;

	payload["checkoutDate"] = new Date();

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully create check out",
			data: await checkoutModel.create(
				payload,
				payload["checkInId"],
				roomId
			),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create check out",
			detail: err,
		});
	}
});

module.exports = router;
