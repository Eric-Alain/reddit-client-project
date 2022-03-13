import { FETCH_SUBREDDITS } from '/src/state/types/subreddits'

export const fetchSubreddits = string => ({
  type: FETCH_SUBREDDITS,
  payload: string
})
