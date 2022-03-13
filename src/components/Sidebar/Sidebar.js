import React, { useEffect } from 'react'
//import PropTypes from "prop-types"

import { useDispatch, useSelector } from 'react-redux'
import { fetchSubreddits } from '/src/state/actions/subreddits'
import { searchTyped } from '/src/state/actions/search'
import { fetchData, limitDataResults } from '/src/state/actions/data'

import { unique } from '/src/utils/utils'

import Img from 'react-cool-img'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Sidebar = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://www.reddit.com/r/popular.json?geo_filter=CA&limit=30')
      .then(response => response.json())
      .then(data => {
        let subredditNameArr = unique(data.data.children.map(subreddit => subreddit.data.subreddit_name_prefixed))
        subredditNameArr.length = 20
        subredditNameArr.sort()

        let subredditDataArr = []

        subredditNameArr.forEach(name => {
          fetch(`https://www.reddit.com/${name}/about.json?limit=1`)
            .then(response => response.json())
            .then(data => {
              subredditDataArr.push(data.data)

              if (subredditDataArr.length === 20) {
                dispatch(fetchSubreddits(subredditDataArr))
              }
            })
        })
      })
  }, [dispatch])

  const subreddits = useSelector(state => state.subreddits.children)

  const handleClick = str => {
    fetch(encodeURI(`https://www.reddit.com/${str}.json`))
      .then(response => response.json())
      .then(data => {
        dispatch(fetchData(data))
      })
    dispatch(searchTyped(null))
    dispatch(limitDataResults(4))
  }

  return (
    <Col xs={{ span: 12, order: 1 }} sm={{ span: 5, order: 2 }} md={{ span: 4, order: 2 }} xl={{ span: 3, order: 2 }} id='sidebar' className='border pb-3'>
      <aside>
        <Row className='mx-1 justify-content-between justify-content-md-start'>
          <Col xs='12' className='px-0'>
            <h2 className='mt-3 mb-2'>Subreddits</h2>
            <hr className='mt-0' />
          </Col>
          {subreddits !== undefined
            ? subreddits.map((subreddit, i) => {
                return (
                  <Col xs='6' sm='12' key={i} className='mb-3 p-1 border subreddit-pill'>
                    <button onClick={() => handleClick(subreddit.display_name_prefixed)}>
                      <Row className='justify-content-start align-items-center'>
                        <Col xs='auto' className='pe-0'>
                          <Img
                            className='subreddit-img'
                            style={{
                              backgroundColor: 'grey',
                              width: '24',
                              height: '24'
                            }}
                            src={
                              subreddit.icon_img !== '' && subreddit.icon_img !== null && subreddit.icon_img !== undefined
                                ? subreddit.icon_img
                                : 'https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png'
                            }
                            alt=''
                          />
                        </Col>
                        <Col xs='auto' className='ps-1 ps-md-auto'>
                          <small>{subreddit.display_name}</small>
                        </Col>
                      </Row>
                    </button>
                  </Col>
                )
              })
            : 'Loading...'}
        </Row>
      </aside>
    </Col>
  )
}

Sidebar.propTypes = {
  /*author: PropTypes.string,*/
}

export default Sidebar
