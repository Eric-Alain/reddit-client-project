//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Components
import ThreadMapper from '../__test-components__/ThreadMapper'

//Testing
import { render, screen, fireEvent } from '@testing-library/react'

//3rd party
import registerIcons from '../../icons/icons'

const intersectObserverContext = (async () => {
  if (!('IntersectionObserver' in window)) await import('intersection-observer')
})()

const store = createStore()
registerIcons()

//Mock fake data object to simulate fetch using a variable
//For whatever reason, we can seem to pass it to state and then map the state object, so needs to be done manually like this.
const mockData = {
  children: [
    {
      data: {
        author: 'xk4rimx',
        created_utc: 1648239758,
        num_comments: 277,
        permalink: '/r/ProgrammerHumor/comments/tny6wb/stdcout_hello_world_stdendl/',
        preview: {
          images: [
            {
              source: {
                url: 'https://preview.redd.it/8a6g0bai9lp81.jpg?auto=webp&amp;s=b9534e4c5e0719a8f658447380eeea8bf450a02b'
              }
            }
          ]
        },
        subreddit: 'ProgrammerHumor',
        subreddit_name_prefixed: 'r/ProgrammerHumor',
        subreddit_subscribers: 1834896,
        thumbnail: 'https://b.thumbs.redditmedia.com/ZO5fvP9zWLoX-fD4NIc1UjWOP_-QLmP4xMjblTW2Bdc.jpg',
        title: 'std::cout &lt;&lt; "Hello, world!" &lt;&lt; std::endl',
        url: 'https://i.redd.it/8a6g0bai9lp81.jpg'
      }
    }
  ]
}

const minimalComponent = (
  <Redux.Provider store={store}>
    <section>
      <h2>Thread</h2>
      <ThreadMapper data={mockData} />
    </section>
  </Redux.Provider>
)

describe('Thread', () => {
  /******/
  /*TEXT*/
  /******/
  test('Displays a title', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)
    //Find <h2> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'h2' && content === 'Thread'
      })
    ).toBeInTheDocument()
  })

  test('Has a <section> element with a nested <article> element', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Find <section> element, test if it is present
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'section'
      })
    ).toBeInTheDocument()

    //Find <article> element, test if it is present
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })
    ).toBeInTheDocument()
  })

  test('<article> element has: subheading with appropriate href value', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Find <h3> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'h3' && node.textContent === 'std::cout &lt;&lt; "Hello, world!" &lt;&lt; std::endl'
      })
    ).toBeInTheDocument()

    //Find nested <a> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.getAttribute('href') === 'https://i.redd.it/8a6g0bai9lp81.jpg'
      })
    ).toBeInTheDocument()
  })

  test('<article> element has: img tag with appropriate src attribute value', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Assert that there should be an <img> element in doc
    expect(screen.getByAltText('thread-img')).toBeInTheDocument()

    //Assert that there should be an appropriate src value for our <img> element
    //We expect that the image src gets modified by the react-cool-img component, so we test for that value instead of original string provided
    expect(screen.getByAltText('thread-img').src).toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')
  })

  test('<article> element has: a reddit icon, user name and link to user', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Assert that REDDIT-SQUARE icon is present in <article> element
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' &&
          node.getAttribute('data-prefix') === `fab` &&
          node.getAttribute('data-icon') === `reddit-square` &&
          node.classList.contains('fa-reddit-square')
        )
      })
    ).toBeInTheDocument()

    //Find <a> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.textContent === 'xk4rimx'
      })
    ).toBeInTheDocument()

    //Find nested <a> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.getAttribute('href') === `https://www.reddit.com/user/xk4rimx`
      })
    ).toBeInTheDocument()
  })

  test('<article> element has: link to subreddit with appropriately formatted number of subscribers', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Find <a> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.textContent === 'r/ProgrammerHumor'
      })
    ).toBeInTheDocument()

    //Find <span> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'span' && node.textContent === '1.8M'
      })
    ).toBeInTheDocument()

    //Find nested <a> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.getAttribute('href') === 'https://www.reddit.com/r/ProgrammerHumor'
      })
    ).toBeInTheDocument()
  })

  test('<article> element has: a calendar icon with the creation date of the reddit feed', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Assert that REDDIT-SQUARE icon is present in <article> element
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' &&
          node.getAttribute('data-prefix') === `far` &&
          node.getAttribute('data-icon') === `calendar-days` &&
          node.classList.contains('fa-calendar-days')
        )
      })
    ).toBeInTheDocument()

    //Find <small> element, test if it has appropriate value
    //We expect that the date format gets modified by a helper function in the component, so we test for that value instead of original number provided
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'small' && node.textContent === 'Fri, March 25, 2022'
      })
    ).toBeInTheDocument()
  })

  test('<article> element has: a message bubble icon, displays appropriate number of comments and links to reddit feed', () => {
    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(minimalComponent)

    //Assert that REDDIT-SQUARE icon is present in <article> element
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' &&
          node.getAttribute('data-prefix') === `far` &&
          node.getAttribute('data-icon') === `message` &&
          node.classList.contains('fa-message')
        )
      })
    ).toBeInTheDocument()

    //Find <small> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'small' && node.textContent === '277'
      })
    ).toBeInTheDocument()

    //Find <a> element, test if it has appropriate value
    expect(
      screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'a' && node.getAttribute('href') === 'https://www.reddit.com/r/ProgrammerHumor/comments/tny6wb/stdcout_hello_world_stdendl/'
      })
    ).toBeInTheDocument()
  })

  test('Clicking image makes modal appear', () => {
    //Create mock dispatch functions for testing
    const setModalData = obj =>
      store.dispatch({
        type: 'SET_MODAL_DATA',
        payload: obj
      })

    const toggleModal = bool =>
      store.dispatch({
        type: 'TOGGLE_MODAL',
        payload: bool
      })

    //Create event handlers for component, pass as props for sub component
    //Handlers
    const setActiveModal = index => {
      setModalData({ activeModal: index })
      toggleModal(true)
    }

    const setInactiveModal = () => {
      setModalData({ activeModal: null })
      toggleModal(true)
    }
    store.dispatch({
      type: 'SET_MODAL_DATA',
      payload: { activeModal: null }
    })

    const modalData = store.getState().toggles.modalData

    //Render a minimal version of thread, we keep the map function, but are only feeding it a single array item for testing (see redux-mock-data.js)
    render(
      <Redux.Provider store={store}>
        <section>
          <h2>Thread</h2>
          <ThreadMapper data={mockData} setActiveModal={setActiveModal} setInactiveModal={setInactiveModal} modalData={modalData} />
        </section>
      </Redux.Provider>
    )

    //Identify button for opening modal, in this case a div
    const imageModalButton = screen.getByTestId('img-container')

    //Click it
    fireEvent.click(imageModalButton)

    //Assert that XMARK icon is present in modal
    expect(
      screen.getByText((content, node) => {
        return (
          node.tagName.toLowerCase() === 'svg' && node.getAttribute('data-prefix') === `fas` && node.getAttribute('data-icon') === `xmark` && node.classList.contains('fa-xmark')
        )
      })
    ).toBeInTheDocument()

    //Assert that there should be an <img> element in modal
    expect(document.querySelector('.modal-body img')).toBeInTheDocument()

    //Assert that there should be an appropriate src value for our <img> element
    //We expect that the image src gets modified by the react-cool-img component, so we test for that value instead of original string provided
    expect(document.querySelector('.modal-body img').src).toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')
  })
})
