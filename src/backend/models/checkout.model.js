const schema = require("./schema");
const checkInModel = require("./checkin.model");

exports.create = (data, checkInId, roomId) => {
	return new Promise((resolve, reject) => {
		new schema.CheckOutSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				checkInModel
					.editStatus(checkInId, roomId)
					.then(() => {
						resolve(response);
					})
					.catch((error) => {
						reject(error);
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
		schema.CheckOutSchema.find(
			{
				[key]: { $regex: `^${value}`, $options: "i" },
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					let data = result.map(async (el) => {
						const { checkInId, ...rest } = el.toObject();

						const checkIn = await checkInModel.getById(checkInId);

						return {
							...rest,
							checkIn,
						};
					});

					Promise.all(data).then((res) => {
						resolve(res);
					});
				}
			}
		).sort({ checkOutDate: "desc" });
		//.limit(limit ? limit : 10)
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.CheckOutSchema.findById(id, async (err, result) => {
			if (err) {
				reject(err);
			} else {
				const { checkInId, ...rest } = result.toObject();

				const checkIn = await checkInModel.getById(checkInId);

				resolve({
					...rest,
					checkIn,
				});
			}
		});
	});
};
