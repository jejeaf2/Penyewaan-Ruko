import { useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate,
} from "react-router-dom";
import NavBar from "./components/Nav-Bar";
import LoginPage from "./pages/authentication/Login-Page";
import CheckoutListPage from "./pages/checkout/Checkout-List-Page";
import CreateCheckoutPage from "./pages/checkout/Create-Checkout-Page";
import RoomListPage from "./pages/room-management/Room-List-Page";
import CreateUserPage from "./pages/user-management/Create-User-Page";
import UserListPage from "./pages/user-management/User-List-Page";
import UpdateUserPage from "./pages/user-management/Update-User-Page";
import CreateRoomPage from "./pages/room-management/Create-Room-Page";
import UpdateRoomPage from "./pages/room-management/Update-Room-Page";
import CheckinListPage from "./pages/checkin/Checkin-List-Page";
import CreateCheckinPage from "./pages/checkin/Create-Checkin-Page";

const Protected = () => {
	// eslint-disable-next-line
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem("TOKEN")
	);

	return isAuthenticated ? (
		<>
			<NavBar />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" />
	);
};

const AccessLoginPageHandler = () => {
	// eslint-disable-next-line
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem("TOKEN")
	);

	return isAuthenticated ? (
		<Navigate to="/transaction/checkin" />
	) : (
		<LoginPage />
	);
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Protected />}>
					<Route path="transaction">
						<Route path="checkin">
							<Route index element={<CheckinListPage />} />
							<Route
								path="create"
								element={<CreateCheckinPage />}
							/>
						</Route>
						<Route path="checkout">
							<Route index element={<CheckoutListPage />} />
							<Route
								path=":id"
								element={<CreateCheckoutPage />}
							/>
						</Route>
					</Route>
					<Route path="management">
						<Route path="rooms">
							<Route index element={<RoomListPage />} />
							<Route path="create" element={<CreateRoomPage />} />
							<Route
								path="update/:id"
								element={<UpdateRoomPage />}
							/>
						</Route>
						<Route path="users">
							<Route index element={<UserListPage />} />
							<Route path="create" element={<CreateUserPage />} />
							<Route
								path="update/:id"
								element={<UpdateUserPage />}
							/>
						</Route>
					</Route>
				</Route>
				<Route path="/login" element={<AccessLoginPageHandler />} />
				{/* <Route
					path="*"
					element={<Navigate to="/transaction/borrows" />}
				/> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
