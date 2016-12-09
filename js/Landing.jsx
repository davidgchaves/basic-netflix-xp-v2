import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Landing = ({ searchTerm }) => (
  <div className='landing'>
    <h1>Basic NetFlix XP v2</h1>
    <input value={searchTerm} type='text' placeholder='Search' />
    <Link to='/search'>or Browse All</Link>
  </div>
)

const { string } = React.PropTypes
Landing.propTypes = {
  searchTerm: string.isRequired
}

const mapModelToProps = ({ searchTerm }) => ({ searchTerm })

export default connect(mapModelToProps)(Landing)
