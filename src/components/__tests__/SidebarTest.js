//React
import React from 'react'

//Redux
import { Provider } from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Sidebar from '../Sidebar/Sidebar'

//Testing
import renderer from 'react-test-renderer'

//3rd party
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

describe('Sidebar', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Sidebar />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
