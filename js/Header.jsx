import React from 'react'

const Header = ({ handleSearchTermChange, searchTerm }) => (
  <header>
    <h1>Basic Netflix XP v2</h1>
    <input
      type='text' placeholder='Search'
      onChange={handleSearchTermChange}
      value={searchTerm} />
  </header>
)

Header.propTypes = {
  handleSearchTermChange: React.PropTypes.func.isRequired,
  searchTerm: React.PropTypes.string.isRequired
}

export default Header
