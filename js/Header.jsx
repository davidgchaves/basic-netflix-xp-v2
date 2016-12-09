import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setSearchTerm } from './actionCreators'

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value))
  }

  render () {
    const { searchTerm, showSearch } = this.props
    const searchInput =
      <input type='text' placeholder='Search'
        onChange={this.handleSearchTermChange}
        value={searchTerm} />
    const backToSearch =
      <h2>
        <Link to='/search'>Back</Link>
      </h2>

    return (
      <header>
        <h1><Link to='/'>Basic Netflix XP v2</Link></h1>
        {showSearch ? searchInput : backToSearch}
      </header>
    )
  }
}

const { func, bool, string } = React.PropTypes
Header.propTypes = {
  dispatch: func.isRequired,
  searchTerm: string.isRequired,
  showSearch: bool.isRequired
}

const mapModelToProps = ({ searchTerm }) => ({ searchTerm })

export default connect(mapModelToProps)(Header)
