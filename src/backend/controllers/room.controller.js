const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const roomModel = require("../models/room.model");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get all rooms data",
			data: await roomModel.getAll(req.query),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get all rooms data",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get room data",
			data: await roomModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get room data",
			detail: err,
		});
	}
});

router.post("/", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: fs.readFileSync(
				path.join(__dirname, "..", "/uploads/" + req.file.filename)
			),
			contentType: "image/png",
		};
	}

	payload.createdBy = req.user.username;

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully create room",
			data: await roomModel.create(payload),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create room",
			detail: err,
		});
	}
});

router.put("/:id", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: fs.readFileSync(
				path.join(__dirname, "..", "/uploads/" + req.file.filename)
			),
			contentType: "image/png",
		};
	}

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit room data",
			data: await roomModel.edit(req.params.id, payload),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit room data",
			detail: err,
		});
	}
});

router.put("/status/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit room status data",
			data: await roomModel.editStatus(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit room status data",
			detail: err,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await roomModel.delete(req.params.id);

		res.status(200).json({
			status: 204,
			message: "Successfully delete room data",
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to delete room data",
			detail: err,
		});
	}
});

module.exports = router;
