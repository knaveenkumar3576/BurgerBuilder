import React from 'react';

import classes from './Button.css';


const Button = (props) => {
    return (
        <button 
        className={[classes.Button, classes[props.buttonType]].join(' ')} 
        onClick={props.clickhandler}
        disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;