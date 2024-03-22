import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import {
	getToasterErrors,
	getToasterNotifications,
} from "../notifications/notifications.js";

const SignUpForm = () => {
	const [user] = useAuthState(auth);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			if (res) {
				getToasterNotifications("Successfully Signed Up");
			}
		} catch (error) {
			getToasterErrors(error?.message);
		}
	};

	useEffect(() => {
		if (user && user?.uid) {
			navigate("/dashboard/calculator");
		}
	}, [navigate, user]);

	return (
		<div class='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
			<div class='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
				<div class='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
					<div></div>
					<div class='mt-12 flex flex-col items-center'>
						<div class='w-full flex-1 mt-8'>
							<div class='mx-auto max-w-xs'>
								<input
									class='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Email'
								/>
								<input
									class='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='Password'
								/>
								<button
									onClick={handleSignUp}
									class='mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
								>
									<svg
										class='w-6 h-6 -ml-2'
										fill='none'
										stroke='currentColor'
										stroke-width='2'
										stroke-linecap='round'
										stroke-linejoin='round'
									>
										<path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
										<circle cx='8.5' cy='7' r='4' />
										<path d='M20 8v6M23 11h-6' />
									</svg>
									<span class='ml-'>Sign Up</span>
								</button>
								<div className='flex justify-center my-4'>OR</div>
								<div className='flex justify-center'>
									<Link
										to='/'
										className='text-blue-500 underline cursor-pointer'
									>
										Log In
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
