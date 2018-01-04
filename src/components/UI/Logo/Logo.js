import React from 'react';

import classes from './Logo.css';

import logoPath from '../../../assets/images/burger-logo.png'

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={logoPath} alt="Logo here"/>
        </div>
    )
}

export default Logo;