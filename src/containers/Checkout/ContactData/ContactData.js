import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../src/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading : false
    };

    confirmOrderHandler=()=> {

        this.setState({
        loading : true
        });      
  
        const order= {
        ingredients : this.props.ingredients,
        totalPrice : this.props.totalPrice,
        customer : {
            name : 'Naveen Kumar K',
            address : {
                address1 : '1701 E Street',
                city : 'Tempe',
                state : 'AZ'
            }
        },
        deliveryMethod : 'Mail'
        }
            
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({
                loading : false
            });
            this.props.history.push('/');      
        })
        .catch(error => {
            this.setState({
                loading : false
            });              
        });
 
    }    
    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button buttonType="Success" clickhandler={this.confirmOrderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
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

export default ContactData;
