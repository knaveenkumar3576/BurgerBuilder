import * as actionTypes from '../actions/actionTypes'
import axios from '../../../src/axios-orders'


export const purchaseBurgerSuccess=(id, orderData)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail=(error)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart=()=> {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData)=> {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
        .then(response => {
            console.log(response.data);
            dispatch (purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch(error => {
            dispatch (purchaseBurgerFail(error));
        });
    }
}

