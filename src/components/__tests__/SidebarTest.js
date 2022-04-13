//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Sidebar from '../Sidebar/Sidebar'

//Testing
import { render, screen, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'

const intersectObserverContext = (async () => {
  if (!('IntersectionObserver' in window)) await import('intersection-observer')
})()

const store = createStore()

const subreddits = {
  data: {
    data: {
      children: [
        {
          display_name: 'AskReddit',
          icon_img: 'https://b.thumbs.redditmedia.com/EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ.png',
          display_name_prefixed: 'r/AskReddit'
        }
      ]
    }
  }
}

describe('Sidebar', () => {
  test('Displays a title', async () => {
    //axiosMock.get.mockResolvedValueOnce({ children: subreddits })

    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    /* render(
      <Redux.Provider store={store}>
        <Sidebar />
      </Redux.Provider>
    )*/
    //Find <h2> element, test if it has appropriate value
    /* expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'h2' && content === 'Subreddits'
      })
    ).toBeInTheDocument()*/

    render(
      <Redux.Provider store={store}>
        <Sidebar />
      </Redux.Provider>
    )

    screen.debug()
  })

  test('Has an <aside> element', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    /*render(minimalComponent)

    //Find <aside> element, test if it is present
    /*expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'aside'
      })
    ).toBeInTheDocument()*/
  })

  test('<aside> element has: <button> element with appropriate subreddit name', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    /* render(minimalComponent)

    //Assert that button element was added to sidebar
    /* expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'button' && node.textContent === 'AskReddit'
      })
    ).toBeInTheDocument()  */
  })

  test('<aside> element has: <img> element with appropriate src', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    /* render(minimalComponent)

    //Assert that there should be an <img> element in doc
    /* expect(screen.getByAltText('subreddit-img')).toBeInTheDocument()

    //Assert that there should be an appropriate src value for our <img> element
    //We expect that the image src gets modified by the react-cool-img component, so we test for the unique class name provided to it that is reflective of the src
    expect(screen.getByAltText('subreddit-img').classList.value).toMatch(' no-js-EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ')*/
  })

  test('Clicking a subreddit pill fetches new data', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    /*render(minimalComponent)

    //Identify button for opening modal, in this case a div
    /*const subredditButton = screen.getByRole('button')

    //Click it
    await fireEvent.click(subredditButton)*/
  })
})
