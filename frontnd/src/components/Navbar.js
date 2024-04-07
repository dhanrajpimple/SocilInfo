import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<div>
<div>tek Media</div>
<div>
  <Link to ="/">Login </Link> 
  <Link to = "all-post"></Link>|
</div>
</div>
  )
}

export default Navbar