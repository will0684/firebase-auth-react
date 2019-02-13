import React from 'react'
import { withAuthorization } from '../Session';

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}

// Condition: authenticated user can't be null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
