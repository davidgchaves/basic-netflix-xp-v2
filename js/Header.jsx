import React from 'react'
import { Link } from 'react-router'

const Header = ({ handleSearchTermChange, searchTerm, showSearch }) => {
  const searchInput =
    <input type='text' placeholder='Search'
      onChange={handleSearchTermChange}
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

const { func, bool, string } = React.PropTypes
Header.propTypes = {
  handleSearchTermChange: func,
  searchTerm: string,
  showSearch: bool.isRequired
}

export default Header
