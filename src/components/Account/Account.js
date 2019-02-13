import React from 'react'

import { withAuthorization } from '../Session';

const Account = () => {
  return (
    <div>
      Account
    </div>
  )
}

// Condition: Authenticated user can't be null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
