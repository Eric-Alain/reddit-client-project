import { FETCH_SUBREDDITS } from '../types/subreddits'

export const fetchSubreddits = string => ({
  type: FETCH_SUBREDDITS,
  payload: string
})
