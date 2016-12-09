import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { setSearchTerm } from './actionCreators'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value))
  }

  render () {
    const { searchTerm } = this.props

    return (
      <div className='landing'>
        <h1>Basic NetFlix XP v2</h1>
        <input onChange={this.handleSearchTermChange} value={searchTerm} type='text' />
        <Link to='/search'>or Browse All</Link>
      </div>
    )
  }
}

const { func, string } = React.PropTypes
Landing.propTypes = {
  dispatch: func.isRequired,
  searchTerm: string.isRequired
}

const mapModelToProps = ({ searchTerm }) => ({ searchTerm })

export default connect(mapModelToProps)(Landing)
