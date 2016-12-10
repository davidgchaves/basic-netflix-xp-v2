import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { UnwrappedSearch } from './Search'
import preload from '../public/data'
import store from './store'

test('<Search> snapshot test with React Test Renderer', () => {
  const Search = (
    <Provider store={store}>
      <UnwrappedSearch shows={preload.shows} searchTerm='' />
    </Provider>
  )
  const searchComponent = renderer.create(Search)
  const searchTree = searchComponent.toJSON()

  expect(searchTree).toMatchSnapshot()
})
