import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import MessageToast from "../../components/Message-Toast";
import NoData from "../../components/No-Data";
import {
	getAllCheckins,
	searchCheckin,
	updateCheckinStatus,
} from "../../api/Checkin";
import SearchBarCheckin from "../../components/checkin/Search-Bar-Checkin";
import CheckinListTable from "../../components/checkin/Checkin-List-Table";
import DetailCheckinModal from "../../components/checkin/Detail-Checkin-Modal";
import UpdateCheckinStatusModal from "../../components/checkin/Update-Checkin-Status-Modal";

export default function CheckinListPage() {
	const [checkins, setCheckins] = useState([]);

	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: "",
		message: "",
	});

	const [search, setSearch] = useState({
		query: "",
		category: "roomNo",
	});

	const [openDetailCheckinModal, setOpenDetailCheckinModal] = useState(false);
	const [updateCheckinStatusModalState, setUpdateCheckinStatusModalState] =
		useState(false);

	const [checkin, setCheckin] = useState({});
	const [currentIndex, setCurrentIndex] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	const getCheckins = async () => {
		setIsFetching(true);
		const response = await getAllCheckins();
		const data = await response.data;

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
			setCheckins(data);
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
		getCheckins();
		document.title = "Check In List"; // eslint-disable-next-line
	}, []);

	const handleClickDetail = (data) => {
		setCheckin(data);
		setOpenDetailCheckinModal(true);
	};

	const handleAfterCheckIn = () => {
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
		handleAfterCheckIn(); // eslint-disable-next-line
	}, []);

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			getCheckins();
		}

		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = async (e) => {
		setIsFetching(true);
		e.preventDefault();

		const response = await searchCheckin(search.category, search.query);

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
			setCheckins(response.data);
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

	const handleClikCreate = () => {
		navigate("/transaction/checkin/create");
	};

	const handleClickUpdateStatus = (checkin, index) => {
		setCheckin(checkin);
		setCurrentIndex(index);

		setUpdateCheckinStatusModalState(true);
	};

	const handleCheckout = () => {
		navigate(`/transaction/checkout/${checkin._id}`);
	};

	const handleUpdateStatus = async () => {
		setIsLoading(true);
		const response = await updateCheckinStatus(checkin._id);

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
		} else if (response.status === 201) {
			setToastState({
				...toastState,
				show: true,
				title: "Success",
				message: response.message,
			});
			getCheckins();
		} else {
			setToastState({
				...toastState,
				show: true,
				title: "Failed",
				message: response.message,
			});
		}

		setTimeout(() => {
			setToastState({
				...toastState,
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
						<h3 style={style.title}>Sewain List</h3>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-primary shadow"
							style={style.button}
							onClick={() => handleClikCreate()}
						>
							Create Sewa In
						</button>
					</div>
				</div>
				<div className="mb-3">
					<SearchBarCheckin
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						style={style}
					/>
				</div>
				{isFetching ? (
					<Loader style={style} />
				) : checkins.length > 0 ? (
					<CheckinListTable
						checkins={checkins}
						handleClickDetail={handleClickDetail}
						handleClickUpdateStatus={handleClickUpdateStatus}
						currentIndex={currentIndex}
						isLoading={isLoading}
					/>
				) : (
					<NoData />
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
			{openDetailCheckinModal && (
				<DetailCheckinModal
					openDetailCheckinModal={openDetailCheckinModal}
					setOpenDetailCheckinModal={setOpenDetailCheckinModal}
					checkIn={checkin}
					room={checkin.room}
				/>
			)}
			{updateCheckinStatusModalState && (
				<UpdateCheckinStatusModal
					updateCheckinStatusModalState={
						updateCheckinStatusModalState
					}
					setUpdateCheckinStatusModalState={
						setUpdateCheckinStatusModalState
					}
					checkin={checkin}
					handleCheckout={handleCheckout}
					handleUpdateStatus={handleUpdateStatus}
				/>
			)}
		</div>
	);
}
