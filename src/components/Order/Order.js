import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    const ingredients = []
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        }); 
    }

    let ingredientsString = ingredients.map(ingredient => {
        return <span className={classes.Ingredient}> {ingredient.name} ({ingredient.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>
               Ingredients: {ingredientsString} 
            </p>
            <p>
                Price: USD {Number.parseFloat(props.price)}
            </p>
        </div>
    )
}

export default Order;