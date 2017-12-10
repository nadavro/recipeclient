import React, { Component } from 'react';
// FlipMove for list animations
import FlipMove from 'react-flip-move';

import RecipeItem from '../RecipeItem/RecipeItem'
import './RecipeList.css'

export default ({recipes, handleEdit, handleDelete, handleClick}) => (
    <div className="recipes clearfix">
        <FlipMove duration={350} easing="ease-in-out" enterAnimation="accordionHorizontal">
            {recipes.map(recipe => <RecipeItem
                recipe={recipe}
                key={recipe._id}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleClick={handleClick}
            />)}
        </FlipMove>
    </div>
)