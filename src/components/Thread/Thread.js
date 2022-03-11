import React, { useEffect, useRef } from 'react'
//import PropTypes from "prop-types"
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '/src/state/actions/data'

import { htmlDecode, renderDate, nFormatter } from '/src/utils/utils'

import Img from 'react-cool-img'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Thread = () => {
  const dispatch = useDispatch()
  const threadData = useRef(null)

  useEffect(() => {
    fetch('https://www.reddit.com/search.json?q=web%20dev')
      .then(response => response.json())
      .then(data => {
        dispatch(fetchData(data))
        threadData.current = data
      })
  }, [dispatch])

  const data = useSelector(state => state.data.reddit.data)

  return (
    <Col xs={{ span: 12, order: 2 }} md={{ span: 9, order: 1 }} className='border'>
      <main>
        <Row>
          {data !== undefined
            ? data.children.map((child, i) => {
                return (
                  <Col xs='12' className='py-3 mb-3' key={i}>
                    <h3>
                      <a href={child.data.url}>{child.data.title}</a>
                    </h3>
                    <Img
                      className='w-100'
                      style={{
                        backgroundColor: 'grey',
                        width: '480',
                        height: '320'
                      }}
                      src={child.data.preview !== undefined ? htmlDecode(child.data.preview.images[0].source.url.toString()) : 'http://placekitten.com/g/480/320'}
                      alt=''
                    />
                    <hr />
                    <Row className='align-items-end'>
                      <Col xs='4'>
                        <Row>
                          <Col xs='auto'>
                            <FontAwesomeIcon icon={['fab', 'reddit-square']} size='3x' />
                          </Col>
                          <Col xs='auto' className='ps-0'>
                            <a href={`https://www.reddit.com/user/${child.data.author}`}>
                              {child.data.author}
                              <br />
                              <a href={`https://www.reddit.com/${child.data.subreddit_name_prefixed}`}>{child.data.subreddit_name_prefixed}</a>
                            </a>
                            : <small>{nFormatter(child.data.subreddit_subscribers, 1)}</small>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs='4'>
                        <Row>
                          <Col xs='auto'>
                            <FontAwesomeIcon icon={['far', 'calendar-days']} size='3x' />
                          </Col>
                          <Col xs='auto'>{renderDate(child.data.created_utc)}</Col>
                        </Row>
                      </Col>
                      <Col xs='4'>
                        <Row>
                          <Col xs='auto'>
                            <FontAwesomeIcon icon={['far', 'calendar-days']} size='3x' />
                          </Col>
                          <Col xs='auto'>{child.data.num_comments}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                )
              })
            : 'Loading...'}
        </Row>
      </main>
    </Col>
  )
}

Thread.propTypes = {
  /*author: PropTypes.string,*/
}

export default Thread
