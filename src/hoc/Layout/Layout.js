import React,{Component} from 'react'
import Aux from '../Auxillary/Auxillary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

class Layout extends Component {
    state = {
        sideDrawerstate : false
    };

    toggleSideDrawerHandler=() => {
        const currentState = this.state.sideDrawerstate;
        this.setState({
            sideDrawerstate : !currentState
        });    
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleHandler={this.toggleSideDrawerHandler}/>
                <SideDrawer sideDrawerstate={this.state.sideDrawerstate} toggleHandler={this.toggleSideDrawerHandler}/>       
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>    
        );
    }
 }

export default Layout