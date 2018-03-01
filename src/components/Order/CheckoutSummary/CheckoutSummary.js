import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope it taste's well</h1>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button buttonType="Danger" clickhandler={props.checkoutCancelled}> Cancel </Button>
            <Button buttonType="Success" clickhandler={props.checkoutContinued}> Continue </Button>
        </div>
    );
}

export default CheckoutSummary;