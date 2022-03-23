import { FETCH_DATA, LIMIT_DATA_RESULTS } from '../types/data'

export const fetchData = string => ({
  type: FETCH_DATA,
  payload: string
})

export const limitDataResults = num => ({
  type: LIMIT_DATA_RESULTS,
  payload: num
})
