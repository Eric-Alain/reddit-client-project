import { FETCH_DATA, LIMIT_DATA_RESULTS } from '/src/state/types/data'

export const initialState = {
  reddit: {},
  limit: 5
}

const dataReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        reddit: payload
      }
    case LIMIT_DATA_RESULTS:
      return {
        ...state,
        limit: payload
      }

    default:
      return state
  }
}

export default dataReducer
