import { TOGGLE_EXPAND, SET_MODAL_DATA, TOGGLE_MODAL } from '/src/state/types/toggles'

export const initialState = {
  expanded: false,
  modalData: {},
  showModal: false
}

const togglesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_EXPAND:
      return {
        ...state,
        expanded: payload
      }

    case SET_MODAL_DATA:
      return {
        ...state,
        modalData: payload
      }

    case TOGGLE_MODAL:
      return {
        ...state,
        showModal: payload
      }

    default:
      return state
  }
}

export default togglesReducer
