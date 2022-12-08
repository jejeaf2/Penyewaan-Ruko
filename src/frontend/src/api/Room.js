import { BASE_URL } from "./Helper";

const getAllRooms = async () => {
	try {
		const response = await fetch(`${BASE_URL}/room`, {
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const getAvailableRooms = async () => {
	try {
		const response = await fetch(`${BASE_URL}/room?status=Available`, {
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const searchRoom = async (category, value) => {
	try {
		const response = await fetch(`${BASE_URL}/room?${category}=${value}`, {
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const getRoomById = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/room/${id}`, {
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const createRoom = async (data) => {
	try {
		const formData = new FormData();

		const { picture, ...roomData } = data;

		formData.append("picture", picture);
		formData.append("data", JSON.stringify(roomData));

		const response = await fetch(`${BASE_URL}/room`, {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
			body: formData,
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const updateRoom = async (id, data) => {
	try {
		const formData = new FormData();

		const { picture, ...roomData } = data;

		if (picture) {
			formData.append("picture", picture);
		}

		formData.append("data", JSON.stringify(roomData));

		const response = await fetch(`${BASE_URL}/room/${id}`, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
			body: formData,
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const updateRoomStatus = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/room/status/${id}`, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const deleteRoom = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/room/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: localStorage.getItem("TOKEN"),
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

export {
	getAllRooms,
	getAvailableRooms,
	searchRoom,
	getRoomById,
	createRoom,
	updateRoom,
	updateRoomStatus,
	deleteRoom,
};
