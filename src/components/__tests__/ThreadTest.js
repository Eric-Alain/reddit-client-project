import React from 'react'
import renderer from 'react-test-renderer'
import Thread from '../Thread/Thread'

import { Provider } from 'react-redux'
import createStore from '../../state/createStore'
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

describe('Thread', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Thread />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
