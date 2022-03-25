import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import ThreadModal from '../Thread/ThreadModal'

import { Provider } from 'react-redux'
import createStore from '../../state/createStore'
import registerIcons from '../../icons/icons'

(async () => {
  if (!('IntersectionObserver' in window)) await import('intersection-observer')
})()

const store = createStore()
registerIcons()

beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element
  })
})

describe('ThreadModal', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThreadModal show={true} onHide={jest.fn()} img={'http://placekitten.com/g/480/320'} />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
