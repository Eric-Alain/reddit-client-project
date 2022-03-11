import { FETCH_DATA } from '/src/state/types/data'

export const fetchData = string => ({
  type: FETCH_DATA,
  payload: string
})
