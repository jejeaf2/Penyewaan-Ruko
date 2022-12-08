import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageToast from "../../components/Message-Toast";
import CreateRoomForm from "../../components/room-management/Create-Room-Form";
import { createRoom } from "../../api/Room";

export default function CreateRoomPage() {
	const [room, setRoom] = useState({
		roomNo: "",
		type: "Standard",
		price: "",
		facility: "",
		picture: undefined,
	});

	const [picPreview, setPicPreview] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const key = e.target.name;
		let value = null;

		if (key === "picture") {
			value = e.target.files[0];
		} else {
			value = e.target.value;
		}

		setRoom({
			...room,
			[key]: value,
		});
	};

	useEffect(() => {
		if (!room.picture) {
			setPicPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(room.picture);
		setPicPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [room.picture]);

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const response = await createRoom(room);

		setIsLoading(false);

		if (response.status === 401) {
			navigate("/login", {
				state: {
					toastState: {
						show: true,
						title: "Session has expired",
						message: "Your session has expired, please login",
					},
				},
			});
		} else if (response.status === 201) {
			navigate("/management/rooms", {
				state: {
					toastState: {
						show: true,
						title: "Success",
						message: response.message,
					},
				},
			});
		} else {
			setToastState({
				...toastState,
				show: true,
				title: "Failed",
				message: response.message,
			});
			setTimeout(() => {
				setToastState({
					...toastState,
					show: false,
					title: "",
					message: "",
				});
			}, 5000);
		}
	};

	const handleCancel = () => {
		navigate("/management/rooms");
	};

	useEffect(() => {
		document.title = "Create Room";
	}, []);

	const style = {
		page: {
			padding: "30px",
			paddingTop: "70px",
			backgroundColor: "#F9F7F7",
		},
		title: {
			color: "#112D4E",
		},
		label: {
			color: "#3F72AF",
		},
		input: {
			borderRadius: "10px",
			borderColor: "#DBE2EF",
			color: "#3F72AF",
		},
		loader: {
			color: "#3F72AF",
		},
		card: {
			border: "none",
			borderRadius: "20px",
		},
		button: {
			borderRadius: "20px",
		},
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<h3 className="mb-3" style={style.title}>
					Create Room
				</h3>
				<CreateRoomForm
					room={room}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
					handleCancel={handleCancel}
					picPreview={picPreview}
				/>
				<MessageToast
					toastState={toastState}
					setToastState={setToastState}
				/>
			</div>
		</div>
	);
}
