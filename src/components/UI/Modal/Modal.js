import React from 'react';

import Aux from './../../../hoc/Auxillary'
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';


const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} modalClosed={props.modalClosed}></Backdrop>
            <div
                className={classes.Modal}
                style={{transform:props.show ? 'transformY(0)' : 'transformY(-100vh)',
                        opacity : props.show ? '1' : '0' }}
            >
            
                {props.children}
            </div>
        </Aux> 

    )
}

export default Modal;