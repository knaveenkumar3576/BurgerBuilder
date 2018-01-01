import React from 'react';
import Aux from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ordersummary = Object.keys(props.ingredients).map((ingredient) => {
        return ( 
            <li key={ingredient}> 
                {ingredient} : {props.ingredients[ingredient]}
            </li>
        )
    });

    return (
      <Aux>
          <h3>Order Summary:</h3>
          <ul>
            {ordersummary}
          </ul>
          <p><strong>You need to pay ${props.price.toFixed(2)} at the checkout.</strong></p>
          <Button clickhandler={props.cancelorder} buttonType='Danger'> Cancel </Button> 
          <Button clickhandler={props.continueorder} buttonType='Success'> Continue </Button> 
      </Aux>  
    );
}

export default OrderSummary;