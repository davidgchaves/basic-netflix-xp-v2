import { compose, createStore } from 'redux'
import rootReducer from './reducers'

const reduxDevTools = () => (
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f
)

const store = createStore(rootReducer, compose(reduxDevTools()))

export default store
