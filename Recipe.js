import React from 'react';
import './App.css';


const Recipe = ({title,calories,image}) => {
	return (
		<div>
			<h1>{title}</h1>
			<p>Total Calories: {calories}</p>
			<img src={image} alt=""/>
		</div>

	);
}

export default Recipe;