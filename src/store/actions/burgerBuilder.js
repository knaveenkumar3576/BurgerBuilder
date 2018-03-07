import * as actionTypes from '../actions/actionTypes'
import axios from '../../../src/axios-orders'


export const addIngredient=(ingredientName)=> {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient=(ingredientName)=> {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const setIngredients = (ingredients)=> {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setPrice = (price)=> {
    return {
        type: actionTypes.SET_PRICE,
        price: price 
    }
}

export const setInitialState = (ingredients)=> {
    return dispatch => {
        axios.get('https://react-burger-builder-990c7.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        })

        axios.get('https://react-burger-builder-990c7.firebaseio.com/basePrice.json')
        .then(response => {
            dispatch(setPrice(response.data));
        })
        .catch(error => {
            dispatch(fetchPriceFailed());
        })    
    }
}

export const fetchIngredientsFailed = ()=> {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR
    }
}

export const fetchPriceFailed = ()=> {
    return {
        type: actionTypes.FETCH_PRICE_ERROR
    }
}
