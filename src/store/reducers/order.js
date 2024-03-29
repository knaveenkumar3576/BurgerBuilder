import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };        
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false
            };

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
        }
}

export default reducer;