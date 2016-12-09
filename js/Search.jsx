import React from 'react'
import { connect } from 'react-redux'
import ShowCard from './ShowCard'
import Header from './Header'

const Search = ({ searchTerm, shows }) => {
  const showMatchesSearchTerm = show =>
    `${show.title} ${show.description}`
    .toUpperCase()
    .indexOf(searchTerm.toUpperCase()) >= 0

  return (
    <div className='search'>
      <Header showSearch />
      <div>
        {shows
          .filter(showMatchesSearchTerm)
          .map(show => <ShowCard {...show} key={show.imdbID} />)
        }
      </div>
    </div>
  )
}

const { arrayOf, shape, string } = React.PropTypes
Search.propTypes = {
  searchTerm: string.isRequired,
  shows: arrayOf(
    shape({
      title: string.isRequired,
      description: string.isRequired
    }).isRequired
  ).isRequired
}

const mapModelToProps = ({ searchTerm }) => ({ searchTerm })

export default connect(mapModelToProps)(Search)
