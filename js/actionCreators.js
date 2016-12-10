import { ADD_OMDB_DATA, SET_SEARCH_TERM } from './actions'

export const setSearchTerm =
  (searchTerm) => ({ type: SET_SEARCH_TERM, searchTerm })

export const getOMDBDetails = (imdbID) =>
  (dispatch, getState) =>
    fetch(`http://www.omdbapi.com/?i=${imdbID}`)
      .then(res => res.json())
      .then(omdbData => dispatch({ type: ADD_OMDB_DATA, imdbID, omdbData }))
      .catch(err => console.error('fetch error:', err))
