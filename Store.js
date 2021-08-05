import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import './App.css';


const Store = () => {
	const APP_ID = "93c3f5eb";
	const APP_KEY = "1352b76f9dfc618c124e39db9289d8f5";

	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getRecipes();

	}, []);

	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await response.json();
		setRecipes(data.hits);
		console.log(data.hits);
	}

	return (
		<div>
			<h1 className="titleInformation">Try Ordering Food From Us !<br/>
				Contact Information: 778-778-778</h1>

			{recipes.map(recipe => (
				<Recipe
					key={recipe.recipe.label}
					title={recipe.recipe.label}
					calories={recipe.recipe.calories}
					image={recipe.recipe.image}
				/>				
			))}
		</div>

	);
};

export default Store;