import React from 'react';

import AuthUserContext from './context';
import {withFirebase} from '../Firebase';


const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props){
            super(props);
            this.state = {
              authUser: null
            };
          }

        // Listen for auth events (sign in, sign out) then add/remove authUser object in state
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                this.setState({ authUser });
                }else {
                this.setState({ authUser: null});
                }
            }
            )
        }

        // Destroy listener if component unmounts
        componentWillUnmount() {
            this.listener();
        }
        render() {
            return(
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props}/>
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
}

export default withAuthentication;