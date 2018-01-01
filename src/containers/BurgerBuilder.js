import React, { Component } from 'react';
import Aux from '../hoc/Auxillary'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'

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
    totalPrice : 0,
    ingeredientsAdded : false,
    ordered : false
  };

  enableOrDisableOrderButton = (ingredients) => {
    const sum = Object.keys(ingredients).map((ingredient) => {
        return ingredients[ingredient];  
    }).reduce((sum,el) => {
      return sum+el;
    },0);

    this.setState({
      ingeredientsAdded:  sum>0,
    });  
    
  }

  addIngredientHandler = (type) => {
    let Ingredients = {...this.state.ingredients};
    Ingredients[type] = Ingredients[type] +1;
    let totalPrice = this.state.totalPrice;
    totalPrice = totalPrice + INGREDIENT_PRICE_LIST[type];
    this.setState({
      ingredients:  Ingredients,
      totalPrice: totalPrice
    });  
    this.enableOrDisableOrderButton(Ingredients);     
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
    this.enableOrDisableOrderButton(Ingredients);     
  } 

  orderBurgerHandler = (newstate) => {
    this.setState({
      ordered : newstate
    });    
  }

  continueOrderHandler = () => {
    alert('continue order');
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
          <Modal show={this.state.ordered} modalClosed={() => this.orderBurgerHandler(false)}>
            <OrderSummary 
              ingredients={this.state.ingredients}
              cancelorder={() => this.orderBurgerHandler(false)}
              continueorder={this.continueOrderHandler}
              price ={this.state.totalPrice}
              />
          </Modal>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabled={disabledLessControls}
            orderstatus={this.state.ingeredientsAdded}
            orderburger={() => this.orderBurgerHandler(true)}
            price ={this.state.totalPrice}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;
