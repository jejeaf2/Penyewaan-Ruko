const express = require("express");
const router = express.Router();

const checkinModel = require("../models/checkin.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get all check in data",
			data: await checkinModel.getAll(req.query),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get all check in data",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get check in data",
			data: await checkinModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get check in data",
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	/*
        dari user nerima:
        - customer
        - roomNo
        - roomId
        - lengthOfStay
        - totalCost
        - downPayment
        - remains
        - change

        dari backend olah:
        - userInCharge
        - checkInDate

        default:
        - status
        - paymentStatus
    */
	let noon = new Date();
	let midnight = new Date();

	midnight.setDate(midnight.getDate() + 1);

	noon.setHours(12, 0, 0, 0);
	midnight.setHours(0, 0, 0, 0);

	const now = new Date();

	if (now.getTime() > noon.getTime() && now.getTime() < midnight.getTime()) {
		let { roomId, ...payload } = req.body;

		payload["userInCharge"] = req.user.username;

		payload["checkInDate"] = new Date();

		payload["dueDate"] = new Date();

		payload["dueDate"].setDate(
			payload["checkInDate"].getDate() + payload["lengthOfStay"]
		);

		payload["dueDate"].setHours(12, 0, 0, 0);

		if (payload["remains"] == 0) {
			payload["paymentStatus"] = "Paid Off";
		}

		try {
			res.status(201).json({
				status: 201,
				message: "Successfully create check in",
				data: await checkinModel.create(payload, roomId),
			});
		} catch (err) {
			res.status(404).json({
				status: 404,
				message: "Failed to create check in",
				detail: err,
			});
		}
	} else {
		res.status(404).json({
			status: 404,
			message: "Failed to create check in",
			detail: "Cannot check in between 12 AM (midnight) to 12 PM (noon)",
		});
	}
});

router.put("/status/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit check in status data",
			data: await checkinModel.editStatus(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit check in status data",
			detail: err,
		});
	}
});

module.exports = router;
