import { SEARCH_TYPED } from "/src/state/types/search"

export const searchTyped = string => ({
  type: SEARCH_TYPED,
  payload: string,
})
