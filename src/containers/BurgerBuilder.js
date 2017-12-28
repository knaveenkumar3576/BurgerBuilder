import React, { Component } from 'react';
import Aux from '../hoc/Auxillary'
import Burger from '../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients : {
      cheese : 2,
      salad : 1,
      meat : 1
    }
  };

  render() {
    return (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <div>Build controls</div>
        </Aux>
    );
  }
}

export default BurgerBuilder;
