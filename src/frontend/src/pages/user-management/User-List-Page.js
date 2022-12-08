import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	deleteUser,
	getAllUser,
	searchUser,
	updateUserStatus,
} from "../../api/Users";
import Loader from "../../components/Loader";
import MessageToast from "../../components/Message-Toast";
import UserListTable from "../../components/user-management/User-List-Table";
import NoData from "../../components/No-Data";
import SearchBarUser from "../../components/user-management/Search-Bar-User";
import DeleteUserModal from "../../components/user-management/Delete-User-Modal";

export default function UserListPage() {
	const [users, setUsers] = useState([]);

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [currentIndex, setCurrentIndex] = useState(null);

	const [user, setUser] = useState({});

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const [search, setSearch] = useState({
		query: "",
		category: "username",
	});

	const [deleteUserModalState, setDeleteUserModalState] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const getUsers = async () => {
		setIsFetching(true);
		const response = await getAllUser();

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
			setUsers(response.data);
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

	useEffect(() => {
		getUsers();
		document.title = "Users List"; // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate("/management/users/create");
	};

	const handleChangeStatus = async (id, index) => {
		setIsLoading(true);
		setCurrentIndex(index);
		const response = await updateUserStatus(id);

		setIsLoading(false);
		setCurrentIndex(null);

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
			setToastState({
				show: true,
				title: "Success",
				message: response.message,
			});
			getUsers();
		} else {
			setToastState({
				show: true,
				title: "Failed",
				message: response.message + ". " + response.detail || "",
			});
		}

		setTimeout(() => {
			setToastState({
				show: false,
				title: "",
				message: "",
			});
		}, 5000);
	};

	const handleUpdateUser = (id) => {
		navigate(`/management/users/update/${id}`);
	};

	const handleAfterCreateUser = () => {
		if (location.state) {
			setToastState(location.state.toastState);
			window.history.replaceState({}, document.title);
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

	useEffect(() => {
		handleAfterCreateUser(); // eslint-disable-next-line
	}, []);

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			getUsers();
		}
		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = async (e) => {
		setIsFetching(true);
		e.preventDefault();

		const response = await searchUser(search.category, search.query);

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
			setUsers(response.data);
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

	const handleClickDelete = (user, index) => {
		setUser(user);
		setCurrentIndex(index);

		setDeleteUserModalState(true);
	};

	const handleDeleteUser = async (id) => {
		setIsLoading(true);
		const response = await deleteUser(id);

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
		} else if (response.status === 204) {
			setToastState({
				show: true,
				title: "Success",
				message: response.message,
			});
			getUsers();
		} else {
			setToastState({
				show: true,
				title: "Failed",
				message: response.message,
			});
		}

		setTimeout(() => {
			setToastState({
				show: false,
				title: "",
				message: "",
			});
		}, 5000);
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
		},
		button: {
			borderRadius: "15px",
		},
	};

	return (
		<div className="min-vh-100" style={style.page}>
			<div className="container">
				<div className="row justify-content-between mb-3">
					<div className="col-auto">
						<h3 style={style.title}>User List</h3>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-primary shadow"
							style={style.button}
							onClick={() => handleClickCreate()}
						>
							Create User
						</button>
					</div>
				</div>
				<div className="mb-3">
					<SearchBarUser
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						style={style}
					/>
				</div>
				{isFetching ? (
					<Loader style={style} />
				) : users.length > 0 ? (
					<UserListTable
						users={users}
						isLoading={isLoading}
						currentIndex={currentIndex}
						handleChangeStatus={handleChangeStatus}
						handleUpdateUser={handleUpdateUser}
						handleClickDelete={handleClickDelete}
					/>
				) : (
					<NoData />
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
			{deleteUserModalState && (
				<DeleteUserModal
					deleteUserModalState={deleteUserModalState}
					setDeleteUserModalState={setDeleteUserModalState}
					user={user}
					handleDeleteUser={handleDeleteUser}
					style={style}
				/>
			)}
		</div>
	);
}
