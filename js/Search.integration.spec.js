import React from 'react'
import renderer from 'react-test-renderer'
import Search from './Search'

test('<Search> snapshot test with React Test Renderer', () => {
  const searchComponent = renderer.create(<Search />)
  const searchTree = searchComponent.toJSON()

  expect(searchTree).toMatchSnapshot()
})
