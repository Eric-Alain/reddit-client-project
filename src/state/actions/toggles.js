import { TOGGLE_EXPAND } from '/src/state/types/toggles'

export const toggleExpanded = bool => ({
  type: TOGGLE_EXPAND,
  payload: bool
})
