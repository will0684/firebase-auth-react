import React from 'react'

import { withAuthorization } from '../Session';

const Account = () => {
  return (
    <div>
      Account
    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
