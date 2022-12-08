import { BASE_URL } from "./Helper";

const logIn = async (credential) => {
	try {
		const response = await fetch(`${BASE_URL}/auth`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credential),
		});

		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const checkToken = async () => {
	try {
		const response = await fetch(`${BASE_URL}/auth/authToken`, {
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

export { logIn, checkToken };
