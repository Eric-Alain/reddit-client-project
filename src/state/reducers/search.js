import { SEARCH_TYPED } from '../types/search'

export const initialState = {
  query: ''
}

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SEARCH_TYPED:
      return {
        ...state,
        query: payload
      }

    default:
      return state
  }
}

export default searchReducer
