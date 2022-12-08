const schema = require("./schema");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.RoomSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};

exports.getAll = (query) => {
	let { limit, ...search } = query;

	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.RoomSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" } },
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		).sort({ roomNo: "asc" });
		//.limit(limit ? limit : 10)
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.RoomSchema.findById(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.RoomSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		});
	});
};

exports.editStatus = (id) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((findByIdRes) => {
				const data = {
					status:
						findByIdRes.status === "Available"
							? "Not Available"
							: "Available",
				};

				schema.RoomSchema.findByIdAndUpdate(id, data, (err, result) => {
					if (err) {
						reject(err);
					} else {
						this.getById(id)
							.then((res) => resolve(res))
							.catch((e) => reject(e));
					}
				});
			})
			.catch((error) => reject(error));
	});
};

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		schema.RoomSchema.findByIdAndDelete(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
