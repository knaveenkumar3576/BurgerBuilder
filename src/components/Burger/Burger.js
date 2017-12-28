import React from 'react' 
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'
const Burger=(props)=> {
    
    const ingredientslist = Object.keys(props.ingredients);
    let ingredientscomponent = [];

    for (let i in ingredientslist) {
        for (let j = 0; j < props.ingredients[ingredientslist[i]]; j++) { 
            ingredientscomponent.push(<BurgerIngredient key={j+ingredientslist[i]} type={ingredientslist[i]}/>) ;
        }
    }
    console.log(ingredientscomponent);
    if(ingredientscomponent.length == 0) {
        ingredientscomponent.push(<p>
            Add some ingredients
        </p>)
    }
    return (
    <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {ingredientscomponent}
        <BurgerIngredient type='bread-bottom' />
    </div>);
}

export default Burger;

