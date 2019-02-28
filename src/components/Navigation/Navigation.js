import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from '../../constants/roles';
import SignOutButton from "../SignOut/SignOut";
import { AuthUserContext } from '../Session';

// Determine navigation items to show if user logged in or not
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => 
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
)

// User is signed in
const NavigationAuth = ({ authUser }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        {authUser.roles.includes(ROLES.ADMIN) && (
          <li>
            <Link to={ROUTES.SIGN_UP}>Add User</Link>
          </li>
        )}
        <li>
          <SignOutButton/>
        </li>
      </ul>
    </div>
  );
};

// User not signed in
const NavigationNonAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing Page</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
