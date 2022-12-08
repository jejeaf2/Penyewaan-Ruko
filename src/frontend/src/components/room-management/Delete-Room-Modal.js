import { Modal } from "react-bootstrap";

export default function DeleteRoomModal(props) {
	return (
		<Modal
			show={props.deleteRoomModalState}
			onHide={() => props.setDeleteRoomModalState(false)}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete Room
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p className="text-center">
					Are you sure you want to delete the room data with
					<br />
					room number: <strong>{props.room.roomNo}</strong>?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<div className="row justify-content-end">
					<div className="col-auto">
						<button
							className="btn btn-outline-dark"
							onClick={() => props.setDeleteRoomModalState(false)}
							style={props.style.button}
						>
							Cancel
						</button>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-danger"
							onClick={() => {
								props.setDeleteRoomModalState(false);
								props.handleDeleteRoom(props.room._id);
							}}
							style={props.style.button}
						>
							Delete
						</button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
