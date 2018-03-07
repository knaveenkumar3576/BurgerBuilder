import React, { Component } from 'react';
import {connect} from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../src/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as orderactions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip code'
                },
                value:'',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 5
                },
                valid: false,
                touched: false
            },
            country : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue:'fastest'},
                        {value:'cheapest', displayValue:'cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formValid: false,
    };

    confirmOrderHandler=(event)=> {
        event.preventDefault();

        const orderData ={};
        
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }

        const order= {
        ingredients : this.props.ingredients,
        totalPrice : this.props.totalPrice,
        customer : orderData
        }
        
        this.props.orderBurger(order);

    }    

    onChangeHandler=(event,inputElement) => {
        const orderFormElements = Object.assign({},this.state.orderForm);
        const targetFormElement = orderFormElements[inputElement];
        targetFormElement.value =  event.target.value;
        targetFormElement.touched =  true;
        targetFormElement.valid= this.checkValidity(targetFormElement.value, targetFormElement.validation);
        orderFormElements[inputElement] = targetFormElement;

        let formIsvalid = true;

        for (let formElement in orderFormElements) {
            formIsvalid= formIsvalid && orderFormElements[formElement].valid
        }
        console.log(formIsvalid)
        this.setState({
            orderForm:
                orderFormElements,
            formValid: formIsvalid
        });
    }

    checkValidity=(value,rules) => {
        let isInvalid = false;
        let fieldValue = value.trim();
        if(rules.required && fieldValue === '') {
            isInvalid = true
        }
        if(!isInvalid && rules.minlength && fieldValue.length < rules.minlength) {
            isInvalid = true
        }
        if(!isInvalid && rules.maxlength && fieldValue.length > rules.maxlength) {
            isInvalid = true
        }

        return !isInvalid;
    }

    render () {
        let orderElementArray=[];
        for (let key in this.state.orderForm) {
            orderElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }


        let form = (
            <form onSubmit={this.confirmOrderHandler}>
                {orderElementArray.map((orderElement)=> {
                    return (
                        <Input 
                        elementType={orderElement.config.elementType} 
                        elementConfig={orderElement.config.elementConfig} 
                        value={orderElement.config.value}
                        inValid={!orderElement.config.valid}
                        validate={orderElement.config.validation && orderElement.config.touched}
                        changed={(event)=>this.onChangeHandler(event,orderElement.id)} />
                    )
                    })
                }
                <Button buttonType="Success" disabled={!this.state.formValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
      ingredients : state.burgerBuilder.ingredients,
      totalPrice : state.burgerBuilder.totalPrice,
      loading: state.order.loading
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        orderBurger : (orderData) => dispatch(orderactions.purchaseBurger(orderData))
    };
}
     
export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(ContactData,axios));

