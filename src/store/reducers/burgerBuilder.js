import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice : 0,
    error : false
};

const INGREDIENT_PRICE_LIST = {
    cheese : 1,
    salad : 1.5,
    bacon: 1.75,
    meat : 2
  }
  

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]+1 
                },
                totalPrice: state.totalPrice+INGREDIENT_PRICE_LIST[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]-1 
                },
                totalPrice: state.totalPrice-INGREDIENT_PRICE_LIST[action.ingredientName]
            };

        case actionTypes.SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };

        case actionTypes.SET_PRICE: 
            return {
                ...state,
                totalPrice: action.price,
                error: false
            };
            
        case actionTypes.FETCH_INGREDIENTS_ERROR: 
            return {
                ...state,
                error: false
            };
        case actionTypes.FETCH_PRICE_ERROR: 
            return {
                ...state,
                error: false
            };

        default:
            return state;
    }
}

export default reducer;