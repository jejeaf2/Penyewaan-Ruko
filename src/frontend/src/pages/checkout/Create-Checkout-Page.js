import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCheckinById } from "../../api/Checkin";
import { createCheckout } from "../../api/Checkout";
import Loader from "../../components/Loader";
import MessageToast from "../../components/Message-Toast";
import { idrFormat } from "../../utils/Formatter";

export default function CreateCheckoutPage() {
	const [checkOut, setCheckOut] = useState({
		totalPrice: "",
		repayment: "",
		change: "",
		remains: "",
		late: {
			isLate: false,
			information: "-",
			fine: "-",
		},
	});

	const [checkIn, setCheckIn] = useState({});
	const [customer, setCustomer] = useState({});
	const [room, setRoom] = useState({});

	const [base64String, setBase64String] = useState("");

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const navigate = useNavigate();
	const { id } = useParams();

	const getCheckIn = async () => {
		setIsFetching(true);
		const response = await getCheckinById(id);

		setIsFetching(false);

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
		} else if (response.status === 200) {
			setCheckIn(response.data);
			setRoom(response.data.room);
			setCustomer(response.data.customer);
			setCheckOut({
				...checkOut,
				totalPrice: response.data.totalCost,
				remains: response.data.remains,
			});
			setBase64String(
				btoa(
					new Uint8Array(response.data.room.picture.data.data).reduce(
						function (data, byte) {
							return data + String.fromCharCode(byte);
						},
						""
					)
				)
			);
		} else {
			navigate("/transaction/checkin", {
				state: {
					toastState: {
						show: true,
						title: "Failed",
						message: response.message,
					},
				},
			});
		}
	};

	useEffect(() => {
		getCheckIn();
		document.title = "Create Check Out"; // eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		const key = e.target.name;
		let value = null;

		if (key === "isLate") {
			value = e.target.checked;

			setCheckOut({
				...checkOut,
				late: {
					...checkOut.late,
					isLate: value,
				},
			});
		} else if (key === "repayment") {
			value = parseInt(e.target.value);

			setCheckOut({
				...checkOut,
				[key]: value || 0,
				change: checkOut.remains - (value || 0),
			});
		} else if (key === "information") {
			value = e.target.value;

			setCheckOut({
				...checkOut,
				late: {
					...checkOut.late,
					[key]: value,
				},
			});
		} else if (key === "fine") {
			value = parseInt(e.target.value);

			setCheckOut({
				...checkOut,
				totalPrice: checkIn.totalCost + (value || 0),
				remains: checkIn.remains + (value || 0),
				late: {
					...checkOut.late,
					[key]: value || 0,
				},
			});
		}
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		let { remains, ...rest } = checkOut;
		rest["checkInId"] = checkIn._id;
		rest["roomId"] = room._id;

		if (!rest["late"]["isLate"]) {
			rest["late"]["information"] = "No Information";
			rest["late"]["fine"] = 0;
		}

		const response = await createCheckout(rest);

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
			navigate("/transaction/checkout", {
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
		navigate("/transaction/checkin");
	};

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
			padding: "20px",
		},
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<h3 className="mb-3" style={style.title}>
					Check Out
				</h3>
				{isFetching ? (
					<Loader style={style} />
				) : (
					checkIn &&
					customer &&
					room && (
						<form onSubmit={handleSubmit}>
							<div
								className="card shadow mb-3"
								style={style.card}
							>
								<div className="card-body">
									<h5
										className="card-title mb-3"
										style={style.title}
									>
										Customer
									</h5>
									<div className="row mb-3">
										<div className="col">
											<h6>ID/KTP</h6>
											<p>{customer["ID"]}</p>
										</div>
										<div className="col">
											<h6>Name</h6>
											<p>{customer["name"]}</p>
										</div>
									</div>
									<div className="row">
										<div className="col">
											<h6>Address</h6>
											<p>{customer["address"]}</p>
										</div>
										<div className="col">
											<h6>Phone Number</h6>
											<p>{customer["phoneNumber"]}</p>
										</div>
									</div>
								</div>
							</div>
							<div className="row mb-5">
								<div className="col">
									<div
										className="card shadow"
										style={style.card}
									>
										<div className="card-body">
											<h5 className="card-title mb-3">
												Check In Information
											</h5>
											<div className="row mb-3">
												<div className="col">
													<h6>Check In Date</h6>
													<p>
														{new Date(
															checkIn.checkInDate
														).toLocaleString()}
													</p>
												</div>
												<div className="col">
													<h6>Due Date</h6>
													<p>
														{new Date(
															checkIn.dueDate
														).toLocaleString()}
													</p>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col">
													<h6>Length Of Stay</h6>
													<p>
														{checkIn.lengthOfStay ===
														1
															? `${checkIn.lengthOfStay} day`
															: `${checkIn.lengthOfStay} days`}
													</p>
												</div>
											</div>
											<h6
												style={{
													textDecoration: "underline",
												}}
											>
												Room Information
											</h6>
											<div className="mb-3 text-center">
												<img
													src={`data:image/png;base64,${base64String}`}
													width={300}
													alt="room preview"
												/>
											</div>
											<div className="row mb-3">
												<div className="col">
													<h6>Room No</h6>
													<p>{room.roomNo}</p>
												</div>
												<div className="col">
													<h6>Price</h6>
													<p>
														{idrFormat(
															room.price || 0
														)}
													</p>
												</div>
											</div>
											<div className="row">
												<div className="col">
													<h6>Type</h6>
													<p>{room.type}</p>
												</div>
												<div className="col">
													<h6>Facility</h6>
													<p>{room.facility}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col">
									<div
										className="card shadow"
										style={style.card}
									>
										<div className="card-body">
											<h5
												className="card-title mb-3"
												style={style.title}
											>
												Billing Information
											</h5>
											<div className="row mb-3">
												<div className="col">
													<h6>Total Cost</h6>
													<p>
														{idrFormat(
															checkIn.totalCost ||
																0
														)}
													</p>
												</div>
												<div className="col">
													<h6>Down Payment</h6>
													<p>
														{idrFormat(
															checkIn.downPayment ||
																0
														)}
													</p>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col">
													<h6>Remains</h6>
													<p>
														{idrFormat(
															checkIn.remains || 0
														)}
													</p>
												</div>
											</div>
											<hr />
											<div className="mb-3">
												<div className="form-check form-switch">
													<input
														className="form-check-input"
														type="checkbox"
														role="switch"
														id="isLate"
														name="isLate"
														value={
															checkOut.late.isLate
														}
														onChange={handleChange}
														style={style.input}
													/>
													<label
														className="form-check-label"
														htmlFor="isLate"
														style={style.label}
													>
														Late
													</label>
												</div>
											</div>
											{checkOut.late.isLate && (
												<div className="row mb-3">
													<div className="col">
														<label
															htmlFor="information"
															className="form-label"
															style={style.label}
														>
															Information
														</label>
														<input
															type="text"
															className="form-control"
															id="information"
															name="information"
															value={
																checkOut.information
															}
															onChange={
																handleChange
															}
															style={style.input}
														/>
													</div>
													<div className="col">
														<label
															htmlFor="fine"
															className="form-label"
															style={style.label}
														>
															Fine
														</label>
														<input
															type="number"
															className="form-control"
															id="fine"
															name="fine"
															value={
																checkOut.fine
															}
															onChange={
																handleChange
															}
															style={style.input}
														/>
													</div>
												</div>
											)}
											<div className="row mb-3">
												<div className="col">
													<h6>Total Price</h6>
													<p>
														{idrFormat(
															checkOut.totalPrice ||
																0
														)}
													</p>
												</div>
												<div className="col">
													<h6>Change</h6>
													<p>
														{idrFormat(
															checkOut.change || 0
														)}
													</p>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col">
													<h6>Remains</h6>
													<p>
														{idrFormat(
															checkOut.remains ||
																0
														)}
													</p>
												</div>
											</div>
											<div className="mb-3">
												<label
													htmlFor="downPayment"
													className="form-label"
													style={style.label}
												>
													Repayment
												</label>
												<input
													type="number"
													className="form-control"
													id="repayment"
													name="repayment"
													value={checkOut.repayment}
													onChange={handleChange}
													style={style.input}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							{isLoading ? (
								<Loader style={style} />
							) : (
								<div className="row">
									<div className="col">
										<div className="d-grid gap-2">
											<button
												className="btn btn-dark shadow"
												type="button"
												onClick={() => handleCancel()}
												style={style.button}
											>
												Cancel
											</button>
										</div>
									</div>
									<div className="col">
										<div className="d-grid gap-2">
											<button
												className="btn btn-success shadow"
												type="submit"
												style={style.button}
											>
												Check Out
											</button>
										</div>
									</div>
								</div>
							)}
						</form>
					)
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}
