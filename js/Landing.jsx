import React from 'react'
import { Link } from 'react-router'

const Landing = () => (
  <div className='landing'>
    <h1>Basic NetFlix XP v2</h1>
    <input type='text' placeholder='Search' />
    <Link to='/search'>or Browse All</Link>
  </div>
)

export default Landing
