import { FETCH_SUBREDDITS } from '../types/subreddits'

export const initialState = {
}

const subredditsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_SUBREDDITS:
      return {
        children: payload
      }

    default:
      return state
  }
}

export default subredditsReducer
