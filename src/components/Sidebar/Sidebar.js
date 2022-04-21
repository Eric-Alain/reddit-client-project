//React
import React from 'react'

//Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

//Redux
import { useDispatch } from 'react-redux'
import { searchTyped } from '../../state/actions/search'
import { fetchData, limitDataResults } from '../../state/actions/data'
import { isLoading } from '../../state/actions/toggles'

//Local image
import redditLogo from '../../images/reddit-logo.svg'

//Utils
import { threadFromSubredditFetch } from '../../utils/fetches'

//3rd party
import { Puff } from 'react-loading-icons'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Sidebar = () => {
  //Redux
  const dispatch = useDispatch()

  const subredditData = useStaticQuery(graphql`
    query subredditQuery {
      allImageSharp(limit: 20) {
        edges {
          node {
            gatsbyImageData(placeholder: DOMINANT_COLOR, blurredOptions: { toFormat: WEBP }, webpOptions: { quality: 50 })
            parent {
              parent {
                ... on SubbreditData {
                  name
                  namePrefixed
                }
              }
            }
          }
        }
      }
    }
  `)

  const subreddits = subredditData.allImageSharp.edges

  //Filter out duplicates
  let uniqueSubreddits = [...new Map(subreddits.map(result => [result.node.parent.parent['namePrefixed'], result])).values()]

  //Set desired length of array
  uniqueSubreddits.length = 20;

  //Sort in desired order
  uniqueSubreddits.sort((a, b) =>
    a.node.parent.parent.name.toLowerCase() > b.node.parent.parent.name.toLowerCase()
      ? 1
      : b.node.parent.parent.name.toLowerCase() > a.node.parent.parent.name.toLowerCase()
      ? -1
      : 0
  )


  //Handler
  const handleClick = str => {
    dispatch(isLoading(true))
    //Async ensures that we are waiting for our fetch to complete before proceeding
    threadFromSubredditFetch(str).then(res => {
      dispatch(fetchData(res))
      dispatch(searchTyped(''))
      dispatch(limitDataResults(5))
      dispatch(isLoading(false))
    })
  }

  return (
    <Col xs={{ span: 10, order: 1 }} sm={{ span: 5, order: 2 }} md={{ span: 4, order: 2 }} xl={{ span: 3, order: 2 }} id='sidebar' className='sidebar-border bg-2 pb-3'>
      <aside>
        <Row className='mx-1 justify-content-between justify-content-md-start'>
          <Col xs='12' className='px-0'>
            <h2 className='mt-3 mb-2'>Subreddits</h2>
            <hr className='mt-0' />
          </Col>
          {/*Map data to DOM once available, limit results based on state limit*/}
          {uniqueSubreddits !== undefined ? (
            uniqueSubreddits.map((subreddit, i) => {
              const image = subreddit.node.gatsbyImageData
              const name = subreddit.node.parent.parent.name
              const namePrefixed = subreddit.node.parent.parent.namePrefixed

              return (
                <Col xs='6' sm='12' key={i} className='mb-3 px-1 subreddit-pill'>
                  <button className='w-100' onClick={() => handleClick(namePrefixed)}>
                    <Row className='justify-content-start align-items-center flex-nowrap overflow-hidden'>
                      <Col xs='auto' className='ps-2 pe-0 py-1'>
                        <GatsbyImage className='subreddit-img' image={image ? image : redditLogo} alt='' />
                      </Col>
                      <Col xs='auto' className='ps-2 ps-md-auto pe-0'>
                        <small>{name}</small>
                      </Col>
                    </Row>
                  </button>
                </Col>
              )
            })
          ) : (
            /*If data unavailable, insert a placeholder element*/
            <Puff className='loading' />
          )}
        </Row>
      </aside>
    </Col>
  )
}

export default Sidebar
