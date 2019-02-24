import React from 'react';

import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const Admin = () => {
  return (
    <div>
      Admin
    </div>
  )
}

//Condition: Authenticated user must not be null
const condition = authUser => 
  !!authUser && authUser.roles.includes(ROLES.ADMIN);

export default withAuthorization(condition)(Admin);
