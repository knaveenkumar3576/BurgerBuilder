import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'

const INGREDIENT_PRICE_LIST = {
  cheese : 1,
  salad : 1.5,
  bacon: 1.75,
  meat : 2
}

class BurgerBuilder extends Component {
  state = {
    ingredients : null,
    totalPrice : 0,
    ingeredientsAdded : false,
    ordered : false,
    loading: false,
    error : false
  };

  componentDidMount() {
    axios.get('https://react-burger-builder-990c7.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({
        ingredients : response.data,
      });
    })
    .catch(error => {
      this.setState({
        error : true
      });      
    })

    axios.get('https://react-burger-builder-990c7.firebaseio.com/basePrice.json')
    .then(response => {
      this.setState({
        totalPrice : response.data
      });
    })
    .catch(error => {
      this.setState({
        error : true
      });      
    })
  }

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

   const queryparams = [];
    for(let i in this.state.ingredients) {
      queryparams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]) )
    }
    
    //Alternative
    // Object.keys(this.state.ingredients).map((ingredient) => {
    //   queryparams.push(encodeURIComponent(ingredient)+ '=' + encodeURIComponent(this.state.ingredients[ingredient]))
    // });

    queryparams.push('price=' + this.state.totalPrice);
    
    this.props.history.push({
      pathname :'/checkout',
      search: '?' + queryparams.join('&')
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

    let orderSummaryComponent = null
    let burgerComponent = this.state.error ? <p>Something went terribly wrong</p> : <Spinner></Spinner>

    if(this.state.ingredients) {

      burgerComponent = (
        <Aux>
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
      )

      orderSummaryComponent = (
        <OrderSummary 
        ingredients={this.state.ingredients}
        cancelorder={() => this.orderBurgerHandler(false)}
        continueorder={this.continueOrderHandler}
        price ={this.state.totalPrice}
        />
      )
    
    }

    if(this.state.loading) {
      orderSummaryComponent = <Spinner></Spinner>
    }
    
    return (
      <Aux>
          <Modal show={this.state.ordered} modalClosed={() => this.orderBurgerHandler(false)}>
            {orderSummaryComponent}
          </Modal>
          {burgerComponent}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder,axios);
