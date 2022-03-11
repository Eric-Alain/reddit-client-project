import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'

import searchReducer from '/src/state/reducers/search'
import dataReducer from '/src/state/reducers/data'

const rootReducer = combineReducers({
  search: searchReducer,
  data: dataReducer
})

// preloadedState will be passed in by the plugin
const store = preloadedState => {
  return createStore(rootReducer, preloadedState, composeWithDevTools())
}

export default store
