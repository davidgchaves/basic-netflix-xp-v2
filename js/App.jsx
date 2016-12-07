import React from 'react'
import { BrowserRouter, Match } from 'react-router'
import Landing from './Landing'
import Search from './Search'
import Details from './Details'
import preload from '../public/data'

const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
)

export default App
