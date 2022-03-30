import { rootReducer } from '../../state/createStore'

describe('Redux state', () => {
  test('Initializes with correct state', () => {
    let state
    state = rootReducer(undefined, {})
    expect(state).toEqual({
      search: { query: '' },
      data: { reddit: {}, limit: 5 },
      subreddits: {},
      toggles: { expanded: false, theme: 'light', dropdownActive: false, modalData: {}, showModal: false }
    })
  })
})
