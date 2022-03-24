import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../Footer/Footer'

import { Provider } from 'react-redux'
import createStore from '../../state/createStore'
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

describe('Footer', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Footer author='Eric Alain' siteUrl='https://www.ericalain.ca' />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
