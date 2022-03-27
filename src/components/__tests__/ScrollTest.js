//React
import React from 'react'

//Redux
import { Provider } from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Scroll from '../Scroll/Scroll'

//Testing
import renderer from 'react-test-renderer'

//3rd party
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
