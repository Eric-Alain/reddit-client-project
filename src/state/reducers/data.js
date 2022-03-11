import { FETCH_DATA } from '/src/state/types/data'

export const initialState = {
  reddit: {}
}

const dataReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        reddit: payload
      }

    default:
      return state
  }
}

export default dataReducer
