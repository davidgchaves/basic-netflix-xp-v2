import React from 'react'
import { render } from 'react-dom'
import '../public/normalize.css'
import '../public/style.css'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <div className='landing'>
          <h1>Basic NetFlix XP v2</h1>
          <input type='text' placeholder='Search' />
          <a>or Browse All</a>
        </div>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)
