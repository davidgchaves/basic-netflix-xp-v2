import rootReducer from './reducers'

test('@@INIT', () => {
  const initialModel = undefined
  const initAction = {}
  const expectedModel = { omdbData: {}, searchTerm: '' }

  expect(
    rootReducer(initialModel, initAction)
  ).toEqual(expectedModel)
})

test('SET_SEARCH_TERM', () => {
  const initialModel = { omdbData: {}, searchTerm: '' }
  const setSearchTermAction = { type: 'SET_SEARCH_TERM', searchTerm: 'jessica jones' }
  const expectedModel = { omdbData: {}, searchTerm: 'jessica jones' }

  expect(
    rootReducer(initialModel, setSearchTermAction)
  ).toEqual(expectedModel)
})
