import React from 'react'
import { BrowserRouter, Match } from 'react-router'
import Landing from './Landing'
import Search from './Search'

const App = () => (
  <BrowserRouter>
    <div className='app'>
      <Match exactly pattern='/' component={Landing} />
      <Match pattern='/search' component={Search} />
    </div>
  </BrowserRouter>
)

export default App
