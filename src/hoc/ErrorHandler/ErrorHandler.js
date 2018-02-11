import React,{Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary'

const ErrorHandler=(WrappedComponent,axios)=> {
    return class extends Component {
        state = {
            error : null
        }
    
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request=> {
                this.setState({
                    error: null
                }); 
                return request
            });

            this.resInterceptor = axios.interceptors.response.use(response => response, error=> {
                this.setState({
                    error: error
                });
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);           
            axios.interceptors.response.eject(this.resInterceptor);
        }

        CloseErrorHandler= () => {
            this.setState({
                error: null
            });        
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.CloseErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}>
    
                    </WrappedComponent>
                </Aux>                
            )
        }
    }
}

export default ErrorHandler