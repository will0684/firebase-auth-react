import React from 'react'

import { withAuthorization } from '../Session'

const Admin = () => {
  return (
    <div>
      Admin
    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Admin);
