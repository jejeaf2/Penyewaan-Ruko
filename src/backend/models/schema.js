const mongoose = require("mongoose");
mongoose
	.connect(
		"mongodb+srv://admin:admin@cluster0.y4tjtbx.mongodb.net/HotelDBApp?retryWrites=true&w=majority"
	)
	// .connect("mongodb://localhost:27017/HotelAppDB")
	.then(() => {
		console.log("MongoDB connection has been established successfully.");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB: ", error);
	});

exports.UserSchema = mongoose.model("User", {
	username: {
		type: String,
		unique: true,
		required: true,
		dropDups: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["Admin", "Receptionist"],
		default: "Receptionist",
	},
	status: {
		type: String,
		required: true,
		enum: ["Active", "Inactive"],
		default: "Active",
	},
	createdBy: {
		type: String,
		required: true,
	},
});

exports.RoomSchema = mongoose.model("Room", {
	roomNo: {
		type: String,
		unique: true,
		required: true,
		dropDups: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["Standard", "Superior", "Deluxe", "Presidential Suite"],
	},
	price: {
		type: Number,
		required: true,
	},
	facility: {
		type: String,
		required: true,
	},
	picture: {
		data: Buffer,
		contentType: String,
	},
	status: {
		type: String,
		required: true,
		enum: ["Available", "Not Available"],
		default: "Available",
	},
	createdBy: {
		type: String,
		required: true,
	},
});

exports.CheckInSchema = mongoose.model("CheckIn", {
	checkInDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	roomNo: {
		type: String,
		required: true,
	},
	customer: {
		name: {
			type: String,
			require: true,
		},
		ID: {
			type: String,
			require: true,
		},
		address: {
			type: String,
			require: true,
		},
		phoneNumber: {
			type: String,
			require: true,
		},
	},
	lengthOfStay: {
		type: Number,
		require: true,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	totalCost: {
		type: Number,
		required: true,
	},
	downPayment: {
		type: Number,
		required: true,
	},
	remains: {
		type: Number,
		required: true,
	},
	change: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["Checked In", "Done", "Checked Out"],
		require: true,
		default: "Checked In",
	},
	paymentStatus: {
		type: String,
		enum: ["Paid Off", "Not Yet Paid Off"],
		require: true,
		default: "Not Yet Paid Off",
	},
	userInCharge: {
		type: String,
		require: true,
	},
});

exports.CheckOutSchema = mongoose.model("CheckOut", {
	checkOutDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	checkInId: {
		type: String,
		required: true,
	},
	late: {
		isLate: {
			type: Boolean,
			required: true,
		},
		information: {
			type: String,
			required: true,
		},
		fine: {
			type: Number,
			required: true,
		},
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	repayment: {
		type: Number,
		required: true,
	},
	change: {
		type: Number,
		required: true,
	},
	userInCharge: {
		type: String,
		required: String,
	},
});
