import React from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

// HOC protects pages from being accessed if user is not logged in

// Param: Condition -> A function that takes authenticated user object. Determines if they get access to a page. Returns boolean.
// Param: Component -> Component to render if user is authorized to view it

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    console.log(condition(authUser));
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
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