import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signUp";
import HistoryPage from "./pages/calculationHistory";
import CalculatorPage from "./pages/calculator";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<LoginPage />} />
				<Route exact path='/dashboard/history' element={<HistoryPage />} />
				<Route
					exact
					path='/dashboard/calculator'
					element={<CalculatorPage />}
				/>
				<Route exact path='/sign-up' element={<SignupPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
