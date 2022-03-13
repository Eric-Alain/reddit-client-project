import { TOGGLE_EXPAND } from '/src/state/types/toggles'

export const initialState = {
  expanded: false
}

const togglesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_EXPAND:
      return {
        ...state,
        expanded: payload
      }

    default:
      return state
  }
}

export default togglesReducer
