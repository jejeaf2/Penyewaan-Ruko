import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCheckout } from "../../api/Checkout";
import Loader from "../../components/Loader";
import MessageToast from "../../components/Message-Toast";
import CheckoutListTable from "../../components/checkout/Checkout-List-Table";
import NoData from "../../components/No-Data";
import SearchBarCheckout from "../../components/checkout/Search-Bar-Checkout";
import DetailCheckoutModal from "../../components/checkout/Detail-Checkout-Modal";

export default function CheckoutListPage() {
	const [checkouts, setCheckouts] = useState([]);
	const [checkoutsList, setCheckoutsList] = useState([]);

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

	const [openDetailCheckoutModal, setOpenDetailCheckoutModal] =
		useState(false);

	const [checkOut, setCheckOut] = useState({});

	const navigate = useNavigate();
	const location = useLocation();

	const getCheckouts = async () => {
		setIsFetching(true);
		const response = await getAllCheckout();
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
			setCheckouts(data);
			setCheckoutsList(data);
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
		getCheckouts();
		document.title = "Check Out List"; // eslint-disable-next-line
	}, []);

	const handleClickDetail = (data) => {
		setCheckOut(data);
		setOpenDetailCheckoutModal(true);
	};

	const handleAfterCheckout = () => {
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
		handleAfterCheckout(); // eslint-disable-next-line
	}, []);

	const handleChangeSearch = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === "query" && value === "") {
			setCheckoutsList(checkouts);
		}

		setSearch({
			...search,
			[key]: value,
		});
	};

	const handleSubmitSearch = async (e) => {
		setIsFetching(true);
		e.preventDefault();
		const response = checkoutsList.filter(function (el) {
			let result = null;
			switch (search.category) {
				case "roomNo":
					result =
						el.checkIn.room.roomNo
							.toLowerCase()
							.indexOf(search.query.toLocaleLowerCase()) > -1;
					break;
				case "customerName":
					result =
						el.checkIn.customer.name
							.toLowerCase()
							.indexOf(search.query.toLocaleLowerCase()) > -1;
					break;
				case "customerId":
					result =
						el.checkIn.customer.ID.toLowerCase().indexOf(
							search.query.toLocaleLowerCase()
						) > -1;
					break;
				default:
					break;
			}

			return result;
		});

		setTimeout(() => {
			setIsFetching(false);
			setCheckoutsList(response);
		}, 1000);
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
				<h3 style={style.title}>Check Out List</h3>
				<div className="mb-3">
					<SearchBarCheckout
						search={search}
						handleChangeSearch={handleChangeSearch}
						handleSubmitSearch={handleSubmitSearch}
						style={style}
					/>
				</div>
				{isFetching ? (
					<Loader style={style} />
				) : checkoutsList.length > 0 ? (
					<CheckoutListTable
						checkouts={checkoutsList}
						handleClickDetail={handleClickDetail}
					/>
				) : (
					<NoData />
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
			{openDetailCheckoutModal && (
				<DetailCheckoutModal
					openDetailCheckoutModal={openDetailCheckoutModal}
					setOpenDetailCheckoutModal={setOpenDetailCheckoutModal}
					checkOut={checkOut}
					checkIn={checkOut.checkIn}
					room={checkOut.checkIn.room}
				/>
			)}
		</div>
	);
}
