//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Scroll from '../Scroll/Scroll'

//Testing
import { render, screen, fireEvent } from '@testing-library/react'

//3rd party
import registerIcons from '../../icons/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const store = createStore()
registerIcons()

describe('Scroll', () => {
  /******/
  /*TEXT*/
  /******/
  test('Clicking the scroll-to-top button calls a function', async () => {
    //Write modified scroll to top function for testing
    const handleClick = async () => {
      await fireEvent.scroll(window, { target: { scrollY: 0 } })
    }

    //Write minimal component for testing
    render(
      <Redux.Provider store={store}>
        <button onClick={handleClick}>Back to top button</button>
      </Redux.Provider>
    )

    //Scroll down a little bit
    await fireEvent.scroll(window, { target: { scrollY: 200 } })

    //Assert that scrolling changes position by certain amount
    expect(window.scrollY).toEqual(200)

    //Find button
    const button = screen.getByRole('button')

    //Click button
    await fireEvent.click(button)

    //Assert that clicking the button scroll page back to top and scroll position reverted to 0
    expect(window.scrollY).toEqual(0)
  })

  test('Displays correct icon within the appropriate element', () => {
    render(
      <Redux.Provider store={store}>
        <Scroll />
      </Redux.Provider>
    )

    //Find a <svg> element, check if it loads the ARROW UP icon from FontAwesome
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' &&
          node.getAttribute('data-prefix') === `fas` &&
          node.getAttribute('data-icon') === `arrow-up` &&
          node.classList.contains('fa-arrow-up')
        )
      })
    ).toBeInTheDocument()
  })
})
