import { FETCH_SUBREDDITS } from '../types/subreddits'

export const initialState = {
  children: []
}

const subredditsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_SUBREDDITS:
      return { ...state, children: payload }

    default:
      return state
  }
}

export default subredditsReducer
