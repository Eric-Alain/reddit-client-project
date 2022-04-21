//Redux
import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducers
import searchReducer from '../state/reducers/search'
import dataReducer from '../state/reducers/data'
import togglesReducer from '../state/reducers/toggles'

//Create root reducer
const rootReducer = combineReducers({
  search: searchReducer,
  data: dataReducer,
  toggles: togglesReducer
})

const middleware = [thunk]

//Create store, pass preloadedState via plugin
const createStore = preloadedState => {
  return reduxCreateStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)))
}

export default createStore
