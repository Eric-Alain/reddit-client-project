//Redux
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducers
import searchReducer from '/src/state/reducers/search'
import dataReducer from '/src/state/reducers/data'
import subredditsReducer from '/src/state/reducers/subreddits'
import togglesReducer from '/src/state/reducers/toggles'

//Create root reducer
const rootReducer = combineReducers({
  search: searchReducer,
  data: dataReducer,
  subreddits: subredditsReducer,
  toggles: togglesReducer
})

//Create store, pass preloadedState via plugin
const store = preloadedState => {
  return createStore(rootReducer, preloadedState, composeWithDevTools())
}

export default store
