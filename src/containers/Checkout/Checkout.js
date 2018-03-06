import React, {Component} from 'react';

import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {
    
    state = {
        ingredients: null,
        totalPrice:0
    }

    // componentWillMount() {
    //     const params = new URLSearchParams(this.props.location.search);

    //     const ingredients = {};
    //     let price=0;
    //     for(let param of params.entries()) {
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = + param[1]
    //         }
    //     }
    //     this.setState({ingredients : ingredients, totalPrice : price});

    // }

    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutContinued={this.continueOrderHandler}
                    checkoutCancelled={this.cancelOrderHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      ingredients : state.ingredients,
      totalPrice : state.totalPrice,
    };
  }
  
export default connect(mapStateToProps)(Checkout);
