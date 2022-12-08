import Loader from "../../components/Loader";

export default function CreateRoomForm(props) {
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
			borderRadius: "15px",
		},
	};

	return (
		<form onSubmit={props.handleSubmit}>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="roomNo"
				>
					Room No
				</label>
				<input
					type="text"
					className="form-control"
					id="roomNo"
					name="roomNo"
					value={props.room.roomNo}
					onChange={props.handleChange}
					style={style.input}
				/>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="type"
				>
					Type
				</label>
				<select
					className="form-select"
					style={style.input}
					id="type"
					name="type"
					value={props.room.type}
					onChange={props.handleChange}
				>
					<option value="Standard">Standard</option>
					<option value="Superior">Superior</option>
					<option value="Deluxe">Deluxe</option>
					<option value="Presidential Suite">
						Presidential Suite
					</option>
				</select>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="price"
				>
					Price
				</label>
				<input
					type="number"
					className="form-control"
					style={style.input}
					id="price"
					name="price"
					value={props.room.price}
					onChange={props.handleChange}
				/>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="facility"
				>
					Facility
				</label>
				<textarea
					rows="6"
					className="form-control"
					style={style.input}
					id="facility"
					name="facility"
					value={props.room.facility}
					onChange={props.handleChange}
				/>
			</div>
			<div className="mb-5">
				<label
					htmlFor="picture"
					className="form-label"
					style={style.label}
				>
					Picture
				</label>
				<div className="row">
					<div className="col">
						<input
							type="file"
							className="form-control"
							id="picture"
							name="picture"
							onChange={props.handleChange}
							style={style.input}
							accept="image/*"
						/>
					</div>
					<div className="col">
						<div className="card text-center" style={style.card}>
							<div className="card-body">
								<h6
									className="card-title mb-3"
									style={style.label}
								>
									Picture Preview
								</h6>
								{props.picPreview && (
									<img
										src={props.picPreview}
										width={500}
										alt="room-preview"
									/>
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
								style={style.button}
								onClick={() => props.handleCancel()}
							>
								Cancel
							</button>
						</div>
					</div>
					<div className="col">
						<div className="d-grid gap-1">
							<button
								className="btn btn-success shadow"
								type="submit"
								style={style.button}
								disabled={
									props.room.roomNo === "" ||
									props.room.type === "" ||
									props.room.facility === "" ||
									props.room.price === "" ||
									props.room.picture === undefined
								}
							>
								Create
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
