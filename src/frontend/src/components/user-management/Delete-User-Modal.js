import { Modal } from "react-bootstrap";

export default function DeleteUserModal(props) {
	return (
		<Modal
			show={props.deleteUserModalState}
			onHide={() => props.setDeleteUserModalState(false)}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete User
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p className="text-center">
					Are you sure you want to delete the user data with
					<br />
					username: <strong>{props.user.username}</strong>?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<div className="row justify-content-end">
					<div className="col-auto">
						<button
							className="btn btn-outline-dark"
							onClick={() => props.setDeleteUserModalState(false)}
							style={props.style.button}
						>
							Cancel
						</button>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-danger"
							onClick={() => {
								props.setDeleteUserModalState(false);
								props.handleDeleteUser(props.user._id);
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
