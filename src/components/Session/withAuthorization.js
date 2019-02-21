import React from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

// HOC protects pages from being accessed if user is not logged in

// Param: condition -> A function that takes current authenticated user object. Determines if they get access to a page. Returns boolean.
// Param: Component -> Component to render if user is authorized to view it

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {

            // Redirect user if they are no longer authorized to view this page
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (authUser){
                        this.props.firebase.user(authUser.uid).get()
                        .then((doc) => {
                            const dbUser = doc.data();

                            // Default roles
                            if (!dbUser.roles) {
                                dbUser.roles = [];
                            }
                            
                            // Merge auth user with firestore user
                            authUser = {
                                uid: authUser.uid,
                                email: authUser.email,
                                ...dbUser
                            };
                            console.log("Auth User", authUser);
                            
                            // Redirect user if they don't meet condition
                            if (!condition(authUser)) {
                                this.props.history.push(ROUTES.SIGN_IN);
                            }

                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                    }
                    else{
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            // Only render component if user is authorized to view it
            return(
                <AuthUserContext.Consumer>
                    {authUser => 
                        condition(authUser) ? <Component {...this.props}/> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;