import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'},
    {label : 'Bacon', type : 'bacon'}    
];


const BuildControls=(props)=> {
    return (
        <div className={classes.BuildControls}>
            <p><strong> Current price: {props.price} </strong></p> 
            {controls.map((control)=> {
                return(
                <BuildControl 
                    key={control.label} 
                    label={control.label} 
                    add={() => props.add(control.type)} 
                    remove={() => props.remove(control.type)}
                    disabledornot={props.disabled[control.type]}
                />
                )
            })
            }          
        </div>
    );
}

export default BuildControls;