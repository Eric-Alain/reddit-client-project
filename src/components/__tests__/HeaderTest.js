import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../Header/Header'

import { Provider } from 'react-redux'
import createStore from '../../state/createStore'
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
