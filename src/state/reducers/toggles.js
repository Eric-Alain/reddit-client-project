import { TOGGLE_EXPAND, TOGGLE_THEME_DROPDOWN, SET_THEME, SET_MODAL_DATA, TOGGLE_MODAL, IS_LOADING } from '../types/toggles'

export const initialState = {
  expanded: false,
  theme: "light",
  dropdownActive: false,
  modalData: {},
  showModal: false,
  isLoading: true
}

const togglesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_EXPAND:
      return {
        ...state,
        expanded: payload
      }

    case TOGGLE_THEME_DROPDOWN:
      return {
        ...state,
        dropdownActive: payload
      }

    case SET_THEME:
      return {
        ...state,
        theme: payload
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

    case IS_LOADING:
      return {
        ...state,
        isLoading: payload
      }

    default:
      return state
  }
}

export default togglesReducer
