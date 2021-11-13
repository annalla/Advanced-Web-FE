import React, { useState,useEffect } from 'react';
import { ClassItem } from './ClassItem';
import "./ClassList.css"

const ClassList = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/classes")
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	},[])

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			
		  <div className="classList">
			{items.map(item => (
			  <div className="classItem" key={item._id}>
				<ClassItem data={item}/>
			  </div>
			))}
		  </div>
		  
		);
	}
	// return (
	// 	<div className="classList">
	// 		<div className="classItem">
	// 			<ClassItem />
	// 		</div>
	// 		<div className="classItem">
	// 			<ClassItem />
	// 		</div>
	// 		<div className="classItem">
	// 			<ClassItem />
	// 		</div>
	// 		<div className="classItem">
	// 			<ClassItem />
	// 		</div>
	// 		{/* <div className="classItem">
	// 		<ClassItem/>
	// 		</div> */}
	// 	</div>
	// )
};
export { ClassList }; //new