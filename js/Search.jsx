import React from 'react'
import ShowCard from './ShowCard'
import Header from './Header'
import preload from '../public/data'

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchTerm: ''
    }

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange (event) {
    this.setState({ searchTerm: event.target.value })
  }

  render () {
    const showMatchesSearchTerm = show =>
      `${show.title} ${show.description}`
        .toUpperCase()
        .indexOf(this.state.searchTerm.toUpperCase()) >= 0

    return (
      <div className='search'>
        <Header
          handleSearchTermChange={this.handleSearchTermChange}
          searchTerm={this.state.searchTerm} />
        <div>
          {preload.shows
            .filter(showMatchesSearchTerm)
            .map(show => <ShowCard {...show} key={show.imdbID} />)
          }
        </div>
      </div>
    )
  }
}

export default Search
