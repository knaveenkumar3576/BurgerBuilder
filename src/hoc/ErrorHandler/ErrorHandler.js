import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary'

const ErrorHandler=(WrappedComponent)=> {
    return (props)=>{
        return (
            <Aux>
                <Modal show>
                    Something wrong
                </Modal>
                <WrappedComponent {...props}>

                </WrappedComponent>
            </Aux>            
        )    
    }
}

export default ErrorHandler