import React, { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { db } from "../../config/firebase.js";
import { auth } from "../../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Calculator = () => {
	const [num1, setNum1] = useState("");
	const [num2, setNum2] = useState("");
	const [operator, setOperator] = useState("+");
	const [currency, setCurrency] = useState("USD");
	const [result, setResult] = useState(0);
	const [usdAmount, setUsdAmount] = useState(0);
	const [user] = useAuthState(auth);

	const addHistoryEntry = async (num1, num2, operator, result, currency) => {
		try {
			await addDoc(collection(db, "calculations"), {
				firstInput: num1,
				secondInput: num2,
				operator,
				result,
				currency,
				userId: user?.uid,
			});
		} catch (error) {
			console.error("Error adding history entry:", error);
		}
	};

	const handleCalculate = () => {
		let calculatedResult;
		switch (operator) {
			case "+":
				calculatedResult = parseFloat(num1) + parseFloat(num2);
				break;
			case "-":
				calculatedResult = parseFloat(num1) - parseFloat(num2);
				break;
			case "*":
				calculatedResult = parseFloat(num1) * parseFloat(num2);
				break;
			case "/":
				calculatedResult = parseFloat(num1) / parseFloat(num2);
				break;
			default:
				calculatedResult = "";
				break;
		}
		setResult(calculatedResult);
		setUsdAmount(calculatedResult);
		addHistoryEntry(num1, num2, operator, calculatedResult, currency);
	};

	const handleCurrencyChange = (currencyType) => {
		if (currencyType === "Euro") {
			setResult(result * 0.92);
		} else if (currencyType === "USD") {
			setResult(usdAmount);
		}
		setCurrency(currency === "USD" ? "Euro" : "USD");
	};

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-3xl font-bold mb-6 text-center'>Calculator</h1>
				<div className='flex flex-col space-y-4'>
					<div className='flex items-center'>
						<input
							className='border border-gray-300 rounded py-2 px-3 w-full'
							type='number'
							value={num1}
							onChange={(e) => setNum1(e.target.value)}
							placeholder='Enter first number'
						/>
						<select
							className='border border-gray-300 rounded py-2 px-3 ml-2'
							value={operator}
							onChange={(e) => setOperator(e.target.value)}
						>
							<option value='+'>+</option>
							<option value='-'>-</option>
							<option value='*'>*</option>
							<option value='/'>/</option>
						</select>
						<input
							className='border border-gray-300 rounded py-2 px-3 ml-2 w-full'
							type='number'
							value={num2}
							onChange={(e) => setNum2(e.target.value)}
							placeholder='Enter second number'
						/>
					</div>
					<button
						className='bg-blue-500 text-white rounded py-2 px-4 w-full'
						onClick={handleCalculate}
					>
						Calculate
					</button>
					<div className='text-center'>
						Result: {formatCurrency(result, currency)}
					</div>
					<button
						className='bg-blue-500 text-white rounded py-2 px-4 w-full'
						onClick={() =>
							handleCurrencyChange(currency === "USD" ? "Euro" : "USD")
						}
					>
						Switch to {currency === "USD" ? "Euro" : "USD"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
