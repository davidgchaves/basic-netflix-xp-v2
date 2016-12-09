import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { setSearchTerm } from './actionCreators'

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value))
  }

  handleSearchSubmit (event) {
    event.preventDefault()
    this.context.router.transitionTo('/search')
  }

  render () {
    const { searchTerm } = this.props

    return (
      <div className='landing'>
        <h1>Basic NetFlix XP v2</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            onChange={this.handleSearchTermChange}
            value={searchTerm}
            type='text' placeholder='Search...' />
          <Link to='/search'>or Browse All</Link>
        </form>
      </div>
    )
  }
}

const { func, object, string } = React.PropTypes
Landing.contextTypes = {
  router: object.isRequired
}
Landing.propTypes = {
  dispatch: func.isRequired,
  searchTerm: string.isRequired
}

const mapModelToProps = ({ searchTerm }) => ({ searchTerm })

export default connect(mapModelToProps)(Landing)
