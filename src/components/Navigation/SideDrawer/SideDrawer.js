import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

const SideDrawer = ( props ) => {
    let sideDrawerclasses = [classes.SideDrawer, classes.Close]; 
    if(props.sideDrawerstate) {
        sideDrawerclasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.sideDrawerstate} modalClosed={props.toggleHandler}> </Backdrop>
            <div className={sideDrawerclasses.join(' ')}>    
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;