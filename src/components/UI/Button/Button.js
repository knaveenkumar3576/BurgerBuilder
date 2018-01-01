import React from 'react';

import classes from './Button.css';


const Button = (props) => {
    return (
        <button className={[classes.Button, classes[props.buttonType]].join(' ')} onClick={props.clickhandler}>
            {props.children}
        </button>
    )
}

export default Button;