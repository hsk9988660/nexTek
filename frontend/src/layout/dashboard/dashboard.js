import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import Header from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const MainLayout = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [user] = useAuthState(auth);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const navigate = useNavigate();

	const handleLogout = () => {
		auth.signOut();
	};

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className='flex h-screen bg-gray-200 font-roboto'>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
				<main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-200'>
					<div className='container mx-auto px-6 py-8'>{children}</div>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
