import React from "react";
import {
	collection,
	query,
	onSnapshot,
	deleteDoc,
	doc,
	where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";

const History = () => {
	const [calcHistory, setCalcHistory] = React.useState([]);
	const [user] = useAuthState(auth);

	React.useEffect(() => {
		if (user?.uid) {
			const q = query(
				collection(db, "calculations"),
				where("userId", "==", user?.uid)
			);
			const unsub = onSnapshot(q, (querySnapshot) => {
				let historyArray = [];
				querySnapshot.forEach((doc) => {
					historyArray.push({ ...doc.data(), id: doc.id });
				});
				setCalcHistory(historyArray);
			});
			return () => unsub();
		}
	}, [user]);

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "calculations", id));
	};

	return (
		<div>
			<h3 className='text-3xl font-medium text-gray-700'>
				Calculation History
			</h3>
			<div className='mt-4'>
				<div className='mt-8'>
					<div className='flex flex-col mt-6'>
						<div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
							<div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
								<table className='min-w-full'>
									<thead>
										<tr>
											<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
												First Input
											</th>
											<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
												Second Input
											</th>
											<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
												Result
											</th>
											<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
												Currency
											</th>
											<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
												Operator
											</th>
											<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
												Actions
											</th>
										</tr>
									</thead>

									<tbody className='bg-white'>
										{calcHistory.map((history, index) => (
											<tr key={index}>
												<td className='px-6 py-4 border-b border-gray-200 whitespace-nowrap'>
													{history?.firstInput}
												</td>
												<td className='px-6 py-4 border-b border-gray-200 whitespace-nowrap'>
													{history?.secondInput}
												</td>
												<td className='px-6 py-4 border-b border-gray-200 whitespace-nowrap'>
													{history?.result}
												</td>
												<td className='px-6 py-4 border-b border-gray-200 whitespace-nowrap'>
													{history?.currency}
												</td>
												<td className='px-6 py-4 text-sm font-medium leading-5 text-start border-b border-gray-200 whitespace-nowrap'>
													{history?.operator}
												</td>
												<td
													className='cursor-pointer px-6 py-4 text-sm font-medium leading-5 text-start border-b border-gray-200 whitespace-nowrap'
													onClick={() => handleDelete(history?.id)}
												>
													Delete
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default History;
