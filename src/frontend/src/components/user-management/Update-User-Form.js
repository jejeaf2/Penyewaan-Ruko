import Loader from "../../components/Loader";

export default function UpdateUserForm(props) {
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
					htmlFor="name"
				>
					Name
				</label>
				<input
					type="text"
					className="form-control"
					id="name"
					name="name"
					value={props.user.name}
					onChange={props.handleChange}
					style={style.input}
				/>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="role"
				>
					Role
				</label>
				<select
					className="form-select"
					style={style.input}
					id="role"
					name="role"
					value={props.user.role}
					onChange={props.handleChange}
				>
					<option value="Admin">Admin</option>
					<option value="Receptionist">Receptionist</option>
				</select>
			</div>
			<div className="mb-3">
				<label
					className="form-label"
					style={style.label}
					htmlFor="username"
				>
					Username
				</label>
				<input
					type="text"
					className="form-control"
					style={style.input}
					id="username"
					name="username"
					value={props.user.username}
					onChange={props.handleChange}
				/>
			</div>
			<div className="mb-3">
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						role="switch"
						id="isEditPassword"
						name="isEditPassword"
						value={props.user.isEditPassword}
						onChange={props.handleChange}
						style={style.input}
					/>
					<label
						className="form-check-label"
						htmlFor="isEditPassword"
						style={style.label}
					>
						Edit Password
					</label>
				</div>
			</div>
			{props.user.isEditPassword && (
				<div className="mb-5">
					<label
						className="form-label"
						style={style.label}
						htmlFor="password"
					>
						Password
					</label>
					<input
						type="password"
						className="form-control"
						style={style.input}
						id="password"
						name="password"
						value={props.user.password}
						onChange={props.handleChange}
						autoComplete="on"
					/>
				</div>
			)}

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
									props.user.name === "" ||
									props.user.role === "" ||
									props.user.username === "" ||
									(props.user.isEditPassword &&
										props.user.password === "")
								}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
