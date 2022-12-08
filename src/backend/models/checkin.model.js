const schema = require("./schema");
const roomModel = require("./room.model");

exports.create = (data, roomId) => {
	return new Promise((resolve, reject) => {
		roomModel.getById(roomId).then((res) => {
			console.log(res.status);
			if (res.status === "Not Available") {
				reject("This room is not available");
			} else {
				new schema.CheckInSchema(data).save((err, response) => {
					if (err) {
						reject(err);
					} else {
						roomModel
							.editStatus(roomId)
							.then(() => {
								resolve(response);
							})
							.catch((error) => {
								reject(error);
							});
					}
				});
			}
		});
	});
};

exports.getAll = (query) => {
	let { limit, ...search } = query;

	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.CheckInSchema.find(
			{
				status: { $in: ["Checked In", "Done"] },
				[key]: { $regex: `^${value}`, $options: "i" },
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					let data = result.map(async (el) => {
						const { roomNo, ...rest } = el.toObject();

						const room = await roomModel.getAll({
							roomNo: roomNo,
						});

						return {
							...rest,
							room: room[0],
						};
					});

					Promise.all(data).then((res) => {
						resolve(res);
					});
				}
			}
		).sort({ checkInDate: "desc" });
		//.limit(limit ? limit : 10)
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.CheckInSchema.findById(id, async (err, result) => {
			if (err) {
				reject(err);
			} else {
				const { roomNo, ...rest } = result.toObject();

				const room = await roomModel.getAll({ roomNo: roomNo });

				resolve({
					...rest,
					room: room[0],
				});
			}
		});
	});
};

exports.editStatus = (id, roomId) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((findByIdRes) => {
				let data = {
					status:
						findByIdRes.status === "Checked In"
							? "Done"
							: "Checked Out",
				};

				if (data.status === "Checked Out") {
					data["paymentStatus"] = "Paid Off";
				}

				schema.CheckInSchema.findByIdAndUpdate(
					id,
					data,
					(err, result) => {
						if (err) {
							reject(err);
						} else {
							if (data.status === "Checked Out") {
								roomModel
									.editStatus(roomId)
									.then((editResult) => {
										this.getById(id)
											.then((res) => resolve(res))
											.catch((e) => reject(e));
									})
									.catch((editError) => {
										reject(editError);
									});
							} else {
								this.getById(id)
									.then((res) => resolve(res))
									.catch((e) => reject(e));
							}
						}
					}
				);
			})
			.catch((err) => reject(err));
	});
};
