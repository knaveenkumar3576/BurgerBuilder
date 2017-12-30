import React, { Component } from 'react';
import Aux from '../hoc/Auxillary'
import Burger from '../components/Burger/Burger';
import BurgerControls from '../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE_LIST = {
  cheese : 1,
  salad : 1.5,
  bacon: 1.75,
  meat : 2
}

class BurgerBuilder extends Component {
  state = {
    ingredients : {
      cheese : 0,
      salad : 0,
      bacon: 0,
      meat : 0
    },
    totalPrice : 0
  };

  addIngredientHandler = (type) => {
    let Ingredients = {...this.state.ingredients};
    Ingredients[type] = Ingredients[type] +1;
    let totalPrice = this.state.totalPrice;
    totalPrice = totalPrice + INGREDIENT_PRICE_LIST[type];
    this.setState({
      ingredients:  Ingredients,
      totalPrice: totalPrice
    });  
  }  

  removeIngredientHandler = (type) => {
    let Ingredients = {...this.state.ingredients};
    Ingredients[type] = Ingredients[type] -1;
    let totalPrice = this.state.totalPrice;
    totalPrice = totalPrice - INGREDIENT_PRICE_LIST[type];
    this.setState({
      ingredients:  Ingredients,
      totalPrice: totalPrice
    });  
    
  }  

  render() {
    let disabledLessControls = {...this.state.ingredients};
    for (let i in disabledLessControls) {
      if(disabledLessControls[i] === 0) {
        disabledLessControls[i] = true;
      } else {
        disabledLessControls[i] = false;
      }
    }
    return (
      <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BurgerControls 
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabled={disabledLessControls}
            price ={this.state.totalPrice}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;
