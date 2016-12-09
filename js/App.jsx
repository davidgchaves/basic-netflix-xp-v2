import React from 'react'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'react-redux'
import Landing from './Landing'
import Search from './Search'
import Details from './Details'
import store from './store'
import preload from '../public/data'

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className='app'>
        <Match exactly pattern='/' component={Landing} />
        <Match
          pattern='/search'
          component={props => <Search shows={preload.shows} {...props} />} />
        <Match
          pattern='/details/:id'
          component={props =>
            <Details
              show={preload.shows.filter(s => props.params.id === s.imdbID)[0]}
              {...props}
              />
          }
          />
      </div>
    </Provider>
  </BrowserRouter>
)

export default App
