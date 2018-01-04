import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from  '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
    return (
        <div className={classes.Toolbar}>
            <DrawerToggle toggleHandler={props.toggleHandler}> </DrawerToggle>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <div className={classes.mobileOnly}>
                <NavigationItems />
            </div>
        </div>
    )
}

export default Toolbar;