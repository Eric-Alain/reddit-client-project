//Redux
import { createStore as reduxCreateStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducers
import searchReducer from '../state/reducers/search'
import dataReducer from '../state/reducers/data'
import subredditsReducer from '../state/reducers/subreddits'
import togglesReducer from '../state/reducers/toggles'

//Create root reducer
export const rootReducer = combineReducers({
  search: searchReducer,
  data: dataReducer,
  subreddits: subredditsReducer,
  toggles: togglesReducer
})

//Create store, pass preloadedState via plugin
const createStore = preloadedState => {
  return reduxCreateStore(rootReducer, preloadedState, composeWithDevTools())
}
export default createStore
