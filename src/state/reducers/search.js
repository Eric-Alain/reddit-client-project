import { SEARCH_TYPED } from '/src/state/types/search'

export const initialState = {
  query: "",
  lastEntry: null
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
