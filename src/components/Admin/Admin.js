import React from 'react'

import { withAuthorization } from '../Session'

const Admin = () => {
  return (
    <div>
      Admin
    </div>
  )
}

//Condition: Authenticated user must not be null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Admin);
