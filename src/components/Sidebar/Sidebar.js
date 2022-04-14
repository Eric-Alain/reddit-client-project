//React
import React, { useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubreddits } from '../../state/actions/subreddits'
import { searchTyped } from '../../state/actions/search'
import { fetchData, limitDataResults } from '../../state/actions/data'
import { isLoading } from '../../state/actions/toggles'

//Local image
import redditLogo from '../../images/reddit-logo.svg'

//Utils
import { threadFromSubredditFetch, fetchPopularSubredditsList, fetchSubredditData } from '../../utils/fetches'

//3rd party
import Img from 'react-cool-img'
import { Puff } from 'react-loading-icons'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Sidebar = () => {
  //Redux
  const dispatch = useDispatch()
  const subreddits = useSelector(state => state.subreddits.children)

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

  //UseEffect
  useEffect(() => {
    //Async ensures that we are waiting for our fetch to complete before proceeding
    fetchPopularSubredditsList().then(res => {
      fetchSubredditData(res, dispatch, fetchSubreddits)
    })
  }, [dispatch])

  return (
    <Col xs={{ span: 10, order: 1 }} sm={{ span: 5, order: 2 }} md={{ span: 4, order: 2 }} xl={{ span: 3, order: 2 }} id='sidebar' className='sidebar-border bg-2 pb-3'>
      <aside>
        <Row className='mx-1 justify-content-between justify-content-md-start'>
          <Col xs='12' className='px-0'>
            <h2 className='mt-3 mb-2'>Subreddits</h2>
            <hr className='mt-0' />
          </Col>
          {/*Map data to DOM once available, limit results based on state limit*/}
          {subreddits !== undefined ? (
            subreddits.map((subreddit, i) => {
              return (
                <Col xs='6' sm='12' key={i} className='mb-3 p-1 subreddit-pill'>
                  <button className='w-100' onClick={() => handleClick(subreddit.namePrefixed)}>
                    <Row className='justify-content-start align-items-center flex-nowrap overflow-hidden'>
                      <Col xs='auto' className='ps-2 pe-0 py-1'>
                        <Img
                          className='subreddit-img'
                          src={subreddit.image !== '' && subreddit.image !== null && subreddit.image !== undefined ? subreddit.image : redditLogo}
                          alt=''
                        />
                      </Col>
                      <Col xs='auto' className='ps-2 ps-md-auto pe-0'>
                        <small>{subreddit.name}</small>
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
