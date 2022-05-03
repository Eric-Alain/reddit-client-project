//React
import React from 'react'

//Redux
import * as Redux from 'react-redux'
import createStore from '../../state/createStore'

//Components
import Thread from '../Thread/Thread'

//Testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

//3rd party
import registerIcons from '../../icons/icons'

const intersectObserverContext = (async () => {
  if (!('IntersectionObserver' in window)) await import('intersection-observer')
})()

const store = createStore()
registerIcons()

//Work around for GSAP bug when testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

/***************/
/*NOTES TO SELF*/
/***************/
//When using waitFor():
//  - Insert all assertions within the function call
//  - Try to avoid multiple waitFor() calls within a single test() call
//  - Ensure you are RETURNING the waitFor() call, otherwise you will receive an error message about overlapping act() calls

describe('Thread', () => {
  /******/
  /*TEXT*/
  /******/
  test('Displays a title', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )
    //Await component useEffect hook to resolve, find <h2> element, assert that it has appropriate value
    return waitFor(() => {
      expect(
        screen.getByText((content, node) => {
          return node.tagName.toLowerCase() === 'h2' && content === 'Thread'
        })
      ).toBeInTheDocument()
    })
  })

  test('Has a <section> element', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <section> element, assert that it has appropriate value
    return waitFor(() => {
      expect(
        screen.getByText((content, node) => {
          return node.tagName.toLowerCase() === 'section'
        })
      ).toBeInTheDocument()
    })
  })

  test('<section> element has 5 nested <article> elements', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <article> elements nested in <section> element
    //Assert that appropriate amount of <article> elements are present
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })
      expect(articles.length).toEqual(5)
    })
  })

  test('<article> elements have:\n\t\u2022 Subheading with defined text\n\t\u2022 Appropriate href value', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <article> elements nested in <section> element
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      //Run through all visible articles
      articles.forEach(article => {
        //Get heading innerHTML (is a link in this case)
        const articleHeading = article.querySelector('h3 a')

        //Assert that the element is defined
        expect(articleHeading.innerHTML).toBeDefined()

        //Assert that the innerHTML of the link is a string
        expect(typeof articleHeading.innerHTML === 'string').toBe(true)

        //Assert that the href attribute of the link matches a basic regex for URLs
        expect(articleHeading.getAttribute('href')).toMatch(/^https:\/\/.*?$/gm)
      })
    })
  })

  test('<article> elements have:\n\t\u2022 <img> element\n\t\u2022 <img> element has appropriate src value', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <article> elements nested in <section> element
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      //Run through all visible articles
      articles.forEach(article => {
        //Get heading innerHTML (is a link in this case)
        const articleImage = article.querySelector('div.img-container img.thread-img')

        //Assert that the element is defined
        expect(articleImage).toBeDefined()

        //Assert that the src of the image is defined
        expect(articleImage.getAttribute('src')).toBeDefined()

        //Assert that the src of the image is a string
        expect(typeof articleImage.getAttribute('src') === 'string').toBe(true)

        //Assert that the src attribute of the image matches a basic regex for expected file types
        //Or empty data attribute set by GSAP when images are below the fold
        expect(articleImage.getAttribute('src')).toMatch(/^https:\/\/.*?\.[jpg|jpeg|png|apng|gif|webp|avif|svg].*?$|^data:.*?$/gm)
      })
    })
  })

  test("<article> elements have:\n\t\u2022 A reddit icon\n\t\u2022 A user name\n\t\u2022 A link to user's page", () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <article> elements nested in <section> element
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      //Run through all visible articles
      articles.forEach(article => {
        //Get the reddit square icon
        const redditSquareIcon = article.querySelector('svg[data-icon="reddit-square"]')
        //Assert that the icon is in the document
        expect(redditSquareIcon).toBeInTheDocument()

        //Get the user text field
        const user = article.querySelector('div.ps-0.col-auto small').querySelectorAll('a')[0]
        //Assert that a user text is defined
        expect(user.innerHTML).toBeDefined()
        //Assert that a user text is of type string
        expect(typeof user.innerHTML === 'string').toBe(true)
        //Assert that href value is defined
        expect(user.getAttribute('href')).toBeDefined()
        //Assert that href value is of type string
        expect(typeof user.getAttribute('href') === 'string').toBe(true)
        //Assert that the string being passed matches the basic form of user URLs
        expect(user.getAttribute('href')).toMatch(/^https:\/\/www\.reddit\.com\/user\/.*?$/gm)

        //Get the subreddit text field
        const subreddit = article.querySelector('div.ps-0.col-auto small').querySelectorAll('a')[1]
        //Assert that a subreddit is defined
        expect(subreddit.innerHTML).toBeDefined()
        //Assert that a subreddit text is of type string
        expect(typeof subreddit.innerHTML === 'string').toBe(true)
        //Assert that the string being passed matches the basic form of subreddit
        expect(subreddit.innerHTML).toMatch(/^r\/.*?$/gm)
        //Assert that href value is defined
        expect(subreddit.getAttribute('href')).toBeDefined()
        //Assert that href value is of type string
        expect(typeof subreddit.getAttribute('href') === 'string').toBe(true)
        //Assert that the string being passed matches the basic form of subreddit URLs
        expect(subreddit.getAttribute('href')).toMatch(/^https:\/\/www\.reddit\.com\/r\/.*?$/gm)

        //Get the userAndSubreddit text field
        const userAndSubredditText = article.querySelector('div.ps-0.col-auto small')
        //Assert that the string ends with the number of subscribers in desired format
        expect(userAndSubredditText.innerHTML).toMatch(/^.*?: \d+\.\d+[a-zA-Z]$/gm)
      })
    })
  })

  test('<article> elements have:\n\t\u2022 A calendar icon\n\t\u2022 Creation date of the reddit feed', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <article> elements nested in <section> element
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      //Run through all visible articles
      articles.forEach(article => {
        //Get the calendar icon
        const calendarDaysIcon = article.querySelector('svg[data-icon="calendar-days"]')
        //Assert that the icon is in the document
        expect(calendarDaysIcon).toBeInTheDocument()

        //Get the date text field
        const date = article.querySelector('div.col-lg-auto.col-12 div.ps-0.col-auto small')
        //Assert that a date text is defined
        expect(date.innerHTML).toBeDefined()
        //Assert that a date text is of type string
        expect(typeof date.innerHTML === 'string').toBe(true)
        //Assert that the string being passed matches the basic desired date format
        expect(date.innerHTML).toMatch(/^[a-zA-Z]+, [a-zA-Z]+ \d+, \d+$/gm)
      })
    })
  })

  test('<article> elements have:\n\t\u2022 A message bubble icon\n\t\u2022 Number of comments\n\t\u2022 Link to the reddit comment feed', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve, find <article> elements nested in <section> element
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      //Run through all visible articles
      articles.forEach(article => {
        //Get the message icon
        const calendarDaysIcon = article.querySelector('svg[data-icon="message"]')
        //Assert that the icon is in the document
        expect(calendarDaysIcon).toBeInTheDocument()

        //Get the comments text field
        const comments = article.querySelector('div.col-lg-auto.col-12 div.ps-0.col-auto small a')
        //Assert that a comment text is defined
        expect(comments.innerHTML).toBeDefined()
        //Assert that the comment text is of type number
        expect(typeof comments.innerHTML === 'string').toBe(true)
        //Assert that the string being passed matches the basic desired number format
        expect(comments.innerHTML).toMatch(/^\d+$/gm)

        //Assert that the comment's href attribute is defined
        expect(comments.getAttribute('href')).toBeDefined()
        //Assert that the comment's href attribute is of type string
        expect(typeof comments.getAttribute('href') === 'string').toBe(true)
        //Assert that the string being passed matches the basic desired URL format
        expect(comments.getAttribute('href')).toMatch(/^https:\/\/www\.reddit\.com\/r\/.*?\/comments\/.*?$/gm)
      })
    })
  })

  test('Clicking the "Show more results..." button reveals more <article> elements', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      const moreButton = screen.getByText((content, node) => {
        return node.tagName.toLowerCase() === 'button' && node.textContent === 'Show more results...'
      })

      //Click show more button
      fireEvent.click(moreButton)

      //Assert that initial amount of <article> elements should be 10 after clicking show more button
      expect(articles.length).toEqual(10)
    })
  })

  test('Modals:\n\t\u2022 Clicking on an image <div> will make a modal appear\n\t\u2022 Clicking on modals close button will make a modal disappear', () => {
    render(
      <Redux.Provider store={store}>
        <Thread />
      </Redux.Provider>
    )

    //Await component useEffect hook to resolve
    return waitFor(() => {
      const articles = screen.getAllByText((content, node) => {
        return node.tagName.toLowerCase() === 'article'
      })

      articles.forEach(article => {
        //Get the image <div> element
        const imageDiv = article.querySelector('div.img-container')
        //Click the image <div> element
        fireEvent.click(imageDiv)

        /******************/
        /*UNFORTUNATE NOTE*/
        /******************/
        //Since Bootstrap modals insert the modal HTML right at the bottom of the <body> tag in the DOM,
        //we can't use the screen variable to find our modal, seeing as it was placed outside of the component that we rendered.
        //This means we need to use document.querySelector() to find the modal, which is a more expensive (time consuming), operation.
        //Ah well...

        //Get active modal element found in DOM, the 'show' class is of particular importance here
        const activeModal = document.querySelector('div.fade.modal.show')
        //Assert that the modal is, in fact, in the doc
        expect(activeModal).toBeInTheDocument()

        //Get the close button of the active modal
        const activeModalClose = document.querySelector('div.fade.modal.show button')
        fireEvent.click(activeModalClose)
      })
    })
  })
})
