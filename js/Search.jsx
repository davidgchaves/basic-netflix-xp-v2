import React from 'react'
import ShowCard from './ShowCard'
import preload from '../public/data'

const Search = () => (
  <div className='search'>
    {preload.shows.map(show => <ShowCard {...show} key={show.imdbID} />)}
  </div>
)

export default Search
