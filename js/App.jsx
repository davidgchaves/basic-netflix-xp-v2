import React from 'react'
import { Match } from 'react-router'
import { Provider } from 'react-redux'
import AsyncRoute from './AsyncRoute'
import store from './store'
import preload from '../public/data'

if (global) {
  global.System = { import () {} }
}

const App = () => (
  <Provider store={store}>
    <div className='app'>
      <Match
        exactly
        pattern='/'
        component={props =>
          <AsyncRoute
            props={props}
            loadingPromise={System.import('./Landing')} />
        }
      />
      <Match
        pattern='/search'
        component={props => {
          const shows = preload.shows
          return (
            <AsyncRoute
              props={Object.assign({ shows }, props)}
              loadingPromise={System.import('./Search')} />
          )
        }}
      />
      <Match
        pattern='/details/:id'
        component={props => {
          const show = preload.shows.filter(s => props.params.id === s.imdbID)[0]
          return (
            <AsyncRoute
              props={Object.assign({ show }, props)}
              loadingPromise={System.import('./Details')} />
          )
        }}
      />
    </div>
  </Provider>
)

export default App
