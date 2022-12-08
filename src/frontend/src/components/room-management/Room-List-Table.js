import { Trash, Pencil, Eye } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import Loader from "../Loader";
import { idrFormat } from "../../utils/Formatter";

export default function RoomListTable(props) {
	const style = {
		loader: {
			color: "#3F72AF",
		},
		button: {
			borderRadius: "15px",
		},
		iconButton: {
			borderRadius: "50px",
		},
	};

	return (
		<div>
			<table className="table">
				<thead className="text-center">
					<tr>
						<th scope="col">Room No</th>
						<th scope="col">Type</th>
						<th scope="col">Price</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{props.rooms &&
						props.rooms.map((el, index) => {
							return (
								<tr key={index}>
									<td scope="row">{el.roomNo}</td>
									<td>{el.type}</td>
									<td>{idrFormat(el.price)}</td>
									<td>
										{el.status === "Available" ? (
											<Badge pill bg="success">
												{el.status}
											</Badge>
										) : (
											<Badge pill bg="secondary">
												{el.status}
											</Badge>
										)}
									</td>
									<td>
										{props.isLoading &&
										props.currentIndex === index ? (
											<Loader style={style} />
										) : (
											<div className="row justify-content-center">
												<div className="col-auto">
													<button
														className="btn btn-info"
														style={style.iconButton}
														onClick={() =>
															props.handleClickDetail(
																el
															)
														}
													>
														<Eye size={16} />
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-warning"
														style={style.button}
														onClick={() =>
															props.handleChangeStatus(
																el._id,
																index
															)
														}
													>
														Change Status
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-warning"
														style={style.iconButton}
														onClick={() =>
															props.handleClickUpdate(
																el._id
															)
														}
													>
														<Pencil size={16} />
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-danger"
														style={style.iconButton}
														onClick={() =>
															props.handleClickDelete(
																el,
																index
															)
														}
													>
														<Trash size={16} />
													</button>
												</div>
											</div>
										)}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
