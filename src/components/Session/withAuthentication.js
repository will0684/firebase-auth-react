import React from 'react';

import AuthUserContext from './context';
import {withFirebase} from '../Firebase';

// HOC provides authenticated user object to App component
// Rest of the app can now access it through AuthUserContext.Consumer
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

                    this.props.firebase.user(authUser.uid).get()
                    .then((doc)=> {
                        const dbUser = doc.data();

                        // Default roles
                        if (!dbUser.roles){
                            dbUser.roles = [];
                        }

                        // Merge auth user and database user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser
                        }
                        console.log(authUser);

                        this.setState({ authUser });

                    })
                    .catch((error)=>{
                        console.log(error);
                    })

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