import React from 'react';
import classes from './Backdrop.css';

const Backdrop=(props) => {
    return props.show ? <div className={classes.Backdrop} onClick={props.modalClosed}> </div> : null;
}


export default Backdrop;