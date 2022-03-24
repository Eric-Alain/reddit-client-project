import React from 'react'
import renderer from 'react-test-renderer'
import Scroll from '../Scroll/Scroll'

import { Provider } from 'react-redux'
import createStore from '../../state/createStore'
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

describe('Scroll', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Scroll />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
