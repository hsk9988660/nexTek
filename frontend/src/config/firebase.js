import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "fir-app-react-49e46.firebaseapp.com",
	projectId: "fir-app-react-49e46",
	storageBucket: "fir-app-react-49e46.appspot.com",
	messagingSenderId: "538820721530",
	appId: "1:538820721530:web:1cdaaac2b8f478d5a8b4c3",
	measurementId: "G-WQLDYTXNZV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
