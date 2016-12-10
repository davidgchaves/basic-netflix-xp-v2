import { ADD_OMDB_DATA, SET_SEARCH_TERM } from './actions'

const DEFAULT_MODEL = {
  omdbData: {},
  searchTerm: ''
}

const setSearchTerm = (model, { searchTerm }) =>
  Object.assign({}, model, { searchTerm })

const addOMDBData = (model, { imdbID, omdbData }) =>
  Object.assign(
    {},
    model,
    { omdbData: Object.assign({}, model.omdbData, { [imdbID]: omdbData }) }
  )

const rootReducer = (model = DEFAULT_MODEL, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(model, action)
    case ADD_OMDB_DATA:
      return addOMDBData(model, action)
    default:
      return model
  }
}

export default rootReducer
