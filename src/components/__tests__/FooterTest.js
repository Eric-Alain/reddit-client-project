//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Footer from '../Footer/Footer'

//Testing
import { render, screen } from '@testing-library/react'

//3rd party
import registerIcons from '../../icons/icons'

const store = createStore()
registerIcons()

const mockAuthor = 'Eric Alain'
const mockSiteUrl = 'https://www.ericalain.ca'

describe('Footer', () => {
  /******/
  /*TEXT*/
  /******/
  test("Displays the correct author and link to author's site", () => {
    render(
      <Redux.Provider store={store}>
        <Footer author={mockAuthor} siteUrl={mockSiteUrl} />
      </Redux.Provider>
    )

    //Find <p> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'p' && node.textContent === `Original solution by: ${mockAuthor}`
      })
    ).toBeInTheDocument()

    //Find <a> element that links to Eric's site, test if it has appropriate href value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.getAttribute('href') === `${mockSiteUrl}`
      })
    ).toBeInTheDocument()
  })
})
