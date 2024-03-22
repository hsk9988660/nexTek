import Swal from "sweetalert2";
import "./sweatalert2.css";

export const getToasterNotifications = (title) => {
	return Swal.fire({
		toast: true,
		icon: "",
		title: `<p> ${title} </p>`,
		background: "rgb(254 250 206)",
		animation: false,
		position: "top",
		showConfirmButton: false,
		timer: 6000,
		timerProgressBar: false,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
};

export const getToasterErrors = (title, position) => {
	return Swal.fire({
		toast: true,
		icon: "",
		title: `<p style=color:#fff> ${title} </p>`,
		background: "#000",
		animation: false,
		position: position ? position : "bottom",
		showConfirmButton: false,
		timer: 6000,
		timerProgressBar: false,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
};
