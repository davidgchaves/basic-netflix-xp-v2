import { SET_SEARCH_TERM } from './actions'

const DEFAULT_MODEL = {
  searchTerm: ''
}

const setSearchTerm = (model, { searchTerm }) =>
  Object.assign({}, model, { searchTerm })

const rootReducer = (model = DEFAULT_MODEL, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(model, action)
    default:
      return model
  }
}

export default rootReducer
