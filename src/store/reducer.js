import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        cheese : 0,
        salad : 0,
        bacon: 0,
        meat : 0      
    },
    totalPrice : 0
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
        default:
            return state;
    }
}

export default reducer;