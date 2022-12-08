import { Modal, Badge } from "react-bootstrap";
import { ArrowRight, ExclamationTriangle } from "react-bootstrap-icons";

export default function UpdateCheckinStatusModal(props) {
	const style = {
		button: {
			borderRadius: "15px",
		},
	};
	return (
		<Modal
			show={props.updateCheckinStatusModalState}
			onHide={() => props.setUpdateCheckinStatusModalState(false)}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Update Check In Status
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="mb-3 text-center">
					<p>
						Are you sure you want to update the check in status with
						<br /> room no:{" "}
						<strong>{props.checkin.room.roomNo}</strong>?
					</p>
				</div>
				<div className="mb-3 row justify-content-center">
					<div className="col-auto">
						<Badge
							bg={
								props.checkin.status === "Checked In"
									? "primary"
									: "success"
							}
						>
							{props.checkin.status}
						</Badge>
					</div>
					<div className="col-auto">
						<ArrowRight size={16} />
					</div>
					<div className="col-auto">
						<Badge
							bg={
								props.checkin.status === "Checked In"
									? "success"
									: "secondary"
							}
						>
							{props.checkin.status === "Checked In"
								? "Done"
								: "Checked Out"}
						</Badge>
					</div>
				</div>
				<div className="text-center">
					<p className="text-danger">
						<ExclamationTriangle size={16} />{" "}
						<strong>This action cannot be undone</strong>
					</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="row justify-content-end">
					<div className="col-auto">
						<button
							className="btn btn-outline-dark"
							onClick={() =>
								props.setUpdateCheckinStatusModalState(false)
							}
							style={style.button}
						>
							Cancel
						</button>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-warning"
							onClick={() => {
								props.setUpdateCheckinStatusModalState(false);
								props.checkin.status === "Done"
									? props.handleCheckout()
									: props.handleUpdateStatus();
							}}
							style={style.button}
						>
							Update
						</button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
