import { Link, useNavigate } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import SideBar from "./Side-Bar";
import { useEffect, useState } from "react";
import { checkToken } from "../api/Authentication";

export default function NavBar() {
	const [show, setShow] = useState(false);
	const [userLoggedIn, setUserLoggedIn] = useState({});

	const navigate = useNavigate();

	const auth = async () => {
		const response = await checkToken();

		if (response.status === 200) {
			setUserLoggedIn(response.data);
		} else {
			localStorage.removeItem("TOKEN");
			navigate("/login", {
				state: {
					toastState: {
						show: true,
						title: "Session has expired",
						message: response.message,
					},
				},
			});
		}
	};

	useEffect(() => {
		auth(); // eslint-disable-next-line
	}, []);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const style = {
		container: {
			borderBottomRightRadius: "10px",
			borderBottomLeftRadius: "10px",
			backgroundColor: "#F9F7F7",
			padding: "10px",
		},
		title: {
			color: "#112D4E",
		},
		menuButton: {
			border: "none",
		},
	};

	return (
		<>
			<nav
				className="navbar navbar-expand-lg fixed-top shadow"
				style={style.container}
			>
				<button
					type="button"
					className="btn"
					style={style.menuButton}
					onClick={handleShow}
				>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<List alignmentBaseline="middle" size={24} />
					</div>
				</button>
				<div className="container-fluid">
					<Link
						className="navbar-brand"
						to="/transaction/checkin"
						style={style.title}
					>
						Hotel App
					</Link>
				</div>
			</nav>

			<SideBar
				show={show}
				handleClose={handleClose}
				role={userLoggedIn.role}
				style={style}
			/>
		</>
	);
}
