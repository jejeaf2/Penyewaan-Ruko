import { useEffect, useState } from "react";
import { Badge, Modal } from "react-bootstrap";
import { idrFormat } from "../../utils/Formatter";

export default function DetailCheckinModal(props) {
	const [base64String, setBase64String] = useState("");

	useEffect(() => {
		setBase64String(
			btoa(
				new Uint8Array(props.room.picture.data.data).reduce(function (
					data,
					byte
				) {
					return data + String.fromCharCode(byte);
				},
				"")
			)
		);
	}, [props.room]);

	return (
		<Modal
			show={props.openDetailCheckinModal}
			onHide={() => props.setOpenDetailCheckinModal(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Detail Check In
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ padding: "20px 50px 50px 50px" }}>
				<div className="row justify-content-between mb-3">
					<div className="col-auto">
						<h5>Check In Information</h5>
					</div>
					<div className="col-auto">
						{props.checkIn.status === "Checked In" ? (
							<Badge pill bg="primary">
								{props.checkIn.status}
							</Badge>
						) : props.checkIn.status === "Done" ? (
							<Badge pill bg="success">
								{props.checkIn.status}
							</Badge>
						) : (
							<Badge pill bg="secondary">
								{props.checkIn.status}
							</Badge>
						)}
					</div>
				</div>
				<div className="row mb-3">
					<div className="col">
						<div className="mb-3">
							<h6>Check In Date</h6>
							<p>
								{new Date(
									props.checkIn.checkInDate
								).toLocaleString()}
							</p>
						</div>
						<div className="mb-3">
							<h6>Length Of Stay</h6>
							<p>
								{props.checkIn.lengthOfStay === 1
									? `${props.checkIn.lengthOfStay} day`
									: `${props.checkIn.lengthOfStay} days`}
							</p>
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<h6>Due Date</h6>
							<p>
								{new Date(
									props.checkIn.dueDate
								).toLocaleString()}
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h5 className="mb-3">Customer Information</h5>
						<div className="mb-3">
							<h6>Name</h6>
							<p>{props.checkIn.customer.name}</p>
						</div>
						<div className="mb-3">
							<h6>ID/KTP</h6>
							<p>{props.checkIn.customer["ID"]}</p>
						</div>
						<div className="mb-3">
							<h6>Address</h6>
							<p>{props.checkIn.customer.address}</p>
						</div>
						<div className="mb-3">
							<h6>Phone Number</h6>
							<p>{props.checkIn.customer.phoneNumber}</p>
						</div>
					</div>
					<div className="col">
						<div className="row justify-content-between mb-3">
							<div className="col-auto">
								<h5>Billing Information</h5>
							</div>
							<div className="col-auto">
								{props.checkIn.paymentStatus === "Paid Off" ? (
									<Badge pill bg="success">
										{props.checkIn.paymentStatus}
									</Badge>
								) : (
									<Badge pill bg="warning">
										{props.checkIn.paymentStatus}
									</Badge>
								)}
							</div>
						</div>
						<div className="mb-3">
							<h6>Total Cost</h6>
							<p>{idrFormat(props.checkIn.totalCost)}</p>
						</div>
						<div className="mb-3">
							<h6>Down Payment</h6>
							<p>{idrFormat(props.checkIn.downPayment)}</p>
						</div>
						<div className="mb-3">
							<h6>Remains</h6>
							<p>{idrFormat(props.checkIn.remains)}</p>
						</div>
						<div className="mb-3">
							<h6>Change</h6>
							<p>{idrFormat(props.checkIn.change)}</p>
						</div>
					</div>
				</div>
				<hr />
				<div className="mb-3">
					<h5 className="text-center mb-3">Room Information</h5>
					<div className="mb-3 text-center">
						<img
							src={`data:image/png;base64,${base64String}`}
							width={400}
							alt="room preview"
						/>
					</div>
					<div className="row">
						<div className="col">
							<div className="mb-3">
								<h6>Room No</h6>
								<p>{props.room.roomNo}</p>
							</div>
							<div className="mb-3">
								<h6>Type</h6>
								<p>{props.room.type}</p>
							</div>
						</div>
						<div className="col">
							<div className="mb-3">
								<h6>Price</h6>
								<p>{idrFormat(props.room.price)}</p>
							</div>
							<div className="mb-3">
								<h6>Facility</h6>
								<span style={{ whiteSpace: "pre-line" }}>
									{props.room.facility}
								</span>
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div>
					<h5 className="mb-3">User In Charge</h5>
					<div>
						<h6>Username</h6>
						<p>{props.checkIn.userInCharge}</p>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}
