import { idrFormat } from "../../utils/Formatter";
import Loader from "../Loader";

export default function CreateCheckinForm(props) {
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
		<form onSubmit={props.handleSubmit}>
			<div className="card shadow mb-3" style={style.card}>
				<div className="card-body">
					<h5 className="card-title" style={style.title}>
						Customer
					</h5>
					<div className="row mb-3">
						<div className="col">
							<label
								htmlFor="ID"
								className="form-label"
								style={style.label}
							>
								ID/KTP
							</label>
							<input
								type="text"
								className="form-control"
								id="ID"
								name="ID"
								value={props.customer.ID}
								onChange={props.handleChangeCustomer}
								style={style.input}
							/>
						</div>
						<div className="col">
							<label
								htmlFor="name"
								className="form-label"
								style={style.label}
							>
								Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={props.customer.name}
								onChange={props.handleChangeCustomer}
								style={style.input}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<label
								htmlFor="address"
								className="form-label"
								style={style.label}
							>
								Address
							</label>
							<textarea
								rows="3"
								type="text"
								className="form-control"
								id="address"
								name="address"
								value={props.customer.address}
								onChange={props.handleChangeCustomer}
								style={style.input}
							/>
						</div>
						<div className="col">
							<label
								htmlFor="phoneNumber"
								className="form-label"
								style={style.label}
							>
								Phone Number
							</label>
							<input
								type="text"
								className="form-control"
								id="phoneNumber"
								name="phoneNumber"
								value={props.customer.phoneNumber}
								onChange={props.handleChangeCustomer}
								style={style.input}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row mb-5">
				<div className="col">
					<div className="card shadow" style={style.card}>
						<div className="card-body">
							<h5 className="card-title">Check In Information</h5>
							<div className="mb-3">
								<label
									htmlFor="lengthOfStay"
									className="form-label"
									style={style.label}
								>
									Length Of Stay
								</label>
								<input
									type="number"
									className="form-control"
									id="lengthOfStay"
									name="lengthOfStay"
									value={props.checkin.lengthOfStay.toString()}
									onChange={props.handleChangeCheckin}
									style={style.input}
								/>
							</div>
							{props.isFetching ? (
								<Loader style={style} />
							) : (
								<>
									<div className="mb-3">
										<label
											htmlFor="room"
											className="form-label"
											style={style.label}
										>
											Room
										</label>
										<select
											className="form-select"
											id="room"
											name="room"
											value={
												props.selectedRoom.roomNo || ""
											}
											onChange={props.handleChangeRoom}
											style={style.input}
										>
											<option value="">
												Select Room
											</option>
											{props.rooms &&
												props.rooms.map((el, index) => {
													return (
														<option
															value={el.roomNo}
															key={index}
														>
															{el.roomNo} -{" "}
															{el.type} |{" "}
															{idrFormat(
																el.price
															)}
														</option>
													);
												})}
										</select>
									</div>
									{props.selectedRoom.base64String && (
										<div className="text-center">
											<p style={style.label}>
												Picture preview
											</p>
											<img
												src={`data:image/png;base64,${props.selectedRoom.base64String}`}
												width={500}
												alt="room"
											/>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card shadow" style={style.card}>
						<div className="card-body">
							<h5 className="card-title" style={style.title}>
								Billing Information
							</h5>
							<div className="mb-5">
								<label
									htmlFor="downPayment"
									className="form-label"
									style={style.label}
								>
									Down Payment (Rp)
								</label>
								<input
									type="number"
									className="form-control"
									id="downPayment"
									name="downPayment"
									value={props.checkin.downPayment}
									onChange={props.handleChangeCheckin}
									style={style.input}
								/>
							</div>
							<div>
								{props.selectedRoom.room !== null && (
									<>
										<h5 className="mb-3">Summary</h5>
										<div className="row justify-content-between mb-3">
											<div className="col-6">
												<h6>Check In Date</h6>
												<p>
													{new Date().toLocaleString()}
												</p>
											</div>
											<div className="col-6">
												<h6>Due Date</h6>
												<p>
													{props.checkin.dueDate.toLocaleString()}
												</p>
											</div>
											<div className="col-6">
												<h6>Length Of Stay</h6>
												<p>
													{(props.checkin
														.lengthOfStay || 0) > 1
														? (props.checkin
																.lengthOfStay ||
																0) + " Days"
														: (props.checkin
																.lengthOfStay ||
																0) + " Day"}
												</p>
											</div>
											<div className="col-6">
												<h6>Room</h6>
												<p>
													{props.selectedRoom.roomNo}{" "}
													-{" "}
													{
														props.selectedRoom.room
															.type
													}{" "}
													|{" "}
													{idrFormat(
														props.selectedRoom.room
															.price
													)}
												</p>
											</div>
										</div>
										<hr />
										<div className="row justify-content-between">
											<div className="col-auto">
												<h6>Price</h6>
											</div>
											<div className="col-auto">
												<p>
													{idrFormat(
														props.selectedRoom.room
															.price
													)}
												</p>
											</div>
										</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<h6>Length Of Stay</h6>
											</div>
											<div className="col-auto">
												<p>
													{(props.checkin
														.lengthOfStay || 0) > 1
														? (props.checkin
																.lengthOfStay ||
																0) + " Days"
														: (props.checkin
																.lengthOfStay ||
																0) + " Day"}
												</p>
											</div>
										</div>
										<div className="row justify-content-end">
											<div className="col-2">
												<hr />
											</div>
										</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<h6>Total Cost</h6>
											</div>
											<div className="col-auto">
												<strong>
													{idrFormat(
														props.selectedRoom.room
															.price *
															props.checkin
																.lengthOfStay
													)}
												</strong>
											</div>
										</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<h6>Down Payment</h6>
											</div>
											<div className="col-auto">
												<p>
													{idrFormat(
														props.checkin
															.downPayment
													)}
												</p>
											</div>
										</div>
										<div className="row justify-content-end">
											<div className="col-2">
												<hr />
											</div>
										</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<h6>Remains</h6>
											</div>
											<div className="col-auto">
												<p>
													{idrFormat(
														props.selectedRoom.room
															.price *
															props.checkin
																.lengthOfStay -
															props.checkin
																.downPayment <
															0
															? 0
															: props.selectedRoom
																	.room
																	.price *
																	props
																		.checkin
																		.lengthOfStay -
																	props
																		.checkin
																		.downPayment
													)}
												</p>
											</div>
										</div>
										<div className="row justify-content-between">
											<div className="col-auto">
												<h6>Change</h6>
											</div>
											<div className="col-auto">
												<p>
													{idrFormat(
														props.selectedRoom.room
															.price *
															props.checkin
																.lengthOfStay >
															props.checkin
																.downPayment
															? 0
															: props.checkin
																	.downPayment -
																	props
																		.selectedRoom
																		.room
																		.price *
																		props
																			.checkin
																			.lengthOfStay
													)}
												</p>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{props.isLoading ? (
				<Loader style={style} />
			) : (
				<div className="row">
					<div className="col">
						<div className="d-grid gap-2">
							<button
								className="btn btn-dark shadow"
								type="button"
								onClick={() => props.handleCancel()}
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
								disabled={
									props.customer["ID"] === "" ||
									props.customer.name === "" ||
									props.customer.address === "" ||
									props.customer.phoneNumber === "" ||
									props.checkin.lengthOfStay === 0 ||
									props.checkin.downPayment === 0 ||
									props.selectedRoom.room === null
								}
							>
								Check In
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
