import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Search from './Search'
import ShowCard from './ShowCard'
import preload from '../public/data'

test('<Search> snapshot test with Enzyme Shallow Rendering', () => {
  const searchComponent = shallow(<Search />)
  const searchTree = shallowToJson(searchComponent)

  expect(searchTree).toMatchSnapshot()
})

test('<Search> renders a <ShowCard> for each show', () => {
  const searchComponent = shallow(<Search />)
  const showCardsRendered = searchComponent.find(ShowCard).length
  const availableShows = preload.shows.length

  expect(showCardsRendered).toEqual(availableShows)
})
