import React from 'react';
import Aux from '../../../hoc/Auxillary'

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
      </Aux>  
    );
}

export default OrderSummary;