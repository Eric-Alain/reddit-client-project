import { TOGGLE_EXPAND, TOGGLE_THEME_DROPDOWN, SET_THEME, SET_MODAL_DATA, TOGGLE_MODAL, IS_LOADING } from '../types/toggles'

export const toggleExpanded = bool => ({
  type: TOGGLE_EXPAND,
  payload: bool
})

export const toggleThemeDropdown = bool => ({
  type: TOGGLE_THEME_DROPDOWN,
  payload: bool
})

export const setTheme = str => ({
  type: SET_THEME,
  payload: str
})

export const setModalData = obj => ({
  type: SET_MODAL_DATA,
  payload: obj
})

export const toggleModal = bool => ({
  type: TOGGLE_MODAL,
  payload: bool
})

export const isLoading = bool => ({
  type: IS_LOADING,
  payload: bool
})
