import { TOGGLE_EXPAND, SET_MODAL_DATA, TOGGLE_MODAL } from '/src/state/types/toggles'

export const toggleExpanded = bool => ({
  type: TOGGLE_EXPAND,
  payload: bool
})

export const setModalData = obj => ({
  type: SET_MODAL_DATA,
  payload: obj
})

export const toggleModal = bool => ({
  type: TOGGLE_MODAL,
  payload: bool
})