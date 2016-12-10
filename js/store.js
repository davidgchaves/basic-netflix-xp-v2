import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const reduxDevTools = () =>
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    reduxDevTools()
  )
)

export default store
