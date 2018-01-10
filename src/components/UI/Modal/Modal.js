import React, { Component } from 'react';

import Aux from './../../../hoc/Auxillary/Auxillary';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // componentWillUpdate() {
    //     console.log("Updated");
    // }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children 
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} modalClosed={this.props.modalClosed}></Backdrop>
                <div
                    className={classes.Modal}
                    style={{transform:this.props.show ? 'transformY(0)' : 'transformY(-100vh)',
                            opacity : this.props.show ? '1' : '0' }}
                >
                    {this.props.children}
                </div>
            </Aux> 

        );
    }
}

export default Modal;