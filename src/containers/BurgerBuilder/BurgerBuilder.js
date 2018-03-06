import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
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

    return sum>0;
    // this.setState({
    //   ingeredientsAdded:  sum>0,
    // });  

  }

  // addIngredientHandler = (type) => {
  //   let Ingredients = {...this.state.ingredients};
  //   Ingredients[type] = Ingredients[type] +1;
  //   let totalPrice = this.state.totalPrice;
  //   totalPrice = totalPrice + INGREDIENT_PRICE_LIST[type];
  //   this.setState({
  //     ingredients:  Ingredients,
  //     totalPrice: totalPrice
  //   });  
  //   this.enableOrDisableOrderButton(Ingredients);     
  // }  

  // removeIngredientHandler = (type) => {
  //   let Ingredients = {...this.state.ingredients};
  //   Ingredients[type] = Ingredients[type] -1;
  //   let totalPrice = this.state.totalPrice;
  //   totalPrice = totalPrice - INGREDIENT_PRICE_LIST[type];
  //   this.setState({
  //     ingredients:  Ingredients,
  //     totalPrice: totalPrice
  //   });
  //   this.enableOrDisableOrderButton(Ingredients);     
  // } 

  orderBurgerHandler = (newstate) => {
    this.setState({
      ordered : newstate
    });    
  }

  continueOrderHandler = () => {

  //  const queryparams = [];
  //   for(let i in this.state.ingredients) {
  //     queryparams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]) )
  //   }
    
  //   //Alternative
  //   // Object.keys(this.state.ingredients).map((ingredient) => {
  //   //   queryparams.push(encodeURIComponent(ingredient)+ '=' + encodeURIComponent(this.state.ingredients[ingredient]))
  //   // });

  //   queryparams.push('price=' + this.state.totalPrice);
    
  //   this.props.history.push({
  //     pathname :'/checkout',
  //     search: '?' + queryparams.join('&')
  //   });

    this.props.history.push('/checkout');

  }
  
  render() {
    let disabledLessControls = {...this.props.ingredients};
    for (let i in disabledLessControls) {
      if(disabledLessControls[i] === 0) {
        disabledLessControls[i] = true;
      } else {
        disabledLessControls[i] = false;
      }
    }

    let orderSummaryComponent = null
    let burgerComponent = this.state.error ? <p>Something went terribly wrong</p> : <Spinner></Spinner>

    if(this.props.ingredients) {

      burgerComponent = (
        <Aux>
            <Burger ingredients={this.props.ingredients}/>
            <BuildControls 
              add={this.props.ingredientAdded}
              remove={this.props.ingredientRemoved}
              disabled={disabledLessControls}
              orderstatus={this.enableOrDisableOrderButton(this.props.ingredients)}
              orderburger={() => this.orderBurgerHandler(true)}
              price ={this.props.totalPrice}
            />
        </Aux>
      )

      orderSummaryComponent = (
        <OrderSummary 
        ingredients={this.props.ingredients}
        cancelorder={() => this.orderBurgerHandler(false)}
        continueorder={this.continueOrderHandler}
        price ={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ingredients : state.ingredients,
    totalPrice : state.totalPrice,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ingredientAdded : (addedIngredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: addedIngredientName}),
    ingredientRemoved : (removedIngredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: removedIngredientName})
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(BurgerBuilder,axios));
