//React
import React from 'react'

//Redux
import { Provider } from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Header from '../Header/Header'

//Testing
import renderer from 'react-test-renderer'

//3rd party
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Header author='Eric Alain' siteUrl='https://www.ericalain.ca' title='Reddit Client Project' />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
