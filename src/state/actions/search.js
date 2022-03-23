import { SEARCH_TYPED } from '../types/search'

export const searchTyped = string => ({
  type: SEARCH_TYPED,
  payload: string
})
