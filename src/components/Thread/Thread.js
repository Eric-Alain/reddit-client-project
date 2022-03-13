import React, { useEffect } from 'react'
//import PropTypes from "prop-types"
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, limitDataResults } from '/src/state/actions/data'

import { htmlDecode, renderDate, nFormatter } from '/src/utils/utils'

import Img from 'react-cool-img'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Thread = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://www.reddit.com/search.json?q=web%20dev')
      .then(response => response.json())
      .then(data => {
        dispatch(fetchData(data))
      })
  }, [dispatch])

  const data = useSelector(state => state.data.reddit.data)
  const limit = useSelector(state => state.data.limit)

  return (
    <>
      <Col xs={{ span: 12, order: 2 }} sm={{ span: 7, order: 1 }} md={{ span: 8, order: 1 }} xl={{ span: 9, order: 1 }} id='thread' className='border'>
        <main>
          <Row>
            <Col xs='12'>
              <h2 className='mt-3 mb-2'>Thread</h2>
              <hr className='my-0' />
            </Col>

            {data !== undefined
              ? data.children.slice(0, limit ? limit : data.children.length).map((child, i) => {
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
                      <Row className='align-items-start justify-content-start justify-content-md-between'>
                        <Col xs='12' md='8'>
                          <Row>
                            <Col xs='auto' className='pe-2'>
                              <FontAwesomeIcon icon={['fab', 'reddit-square']} size='1x' />
                            </Col>
                            <Col xs='auto' className='ps-0'>
                              <small>
                                <a href={`https://www.reddit.com/user/${child.data.author}`}>{child.data.author}</a> |{' '}
                                <a href={`https://www.reddit.com/${child.data.subreddit_name_prefixed}`}>{child.data.subreddit_name_prefixed}</a>:{' '}
                                {nFormatter(child.data.subreddit_subscribers, 1)}
                              </small>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs='12' md='auto'>
                          <Row className='justify-content-start justify-content-md-end'>
                            <Col xs='auto' className='pe-2'>
                              <FontAwesomeIcon icon={['far', 'calendar-days']} size='1x' />
                            </Col>
                            <Col xs='auto' className='ps-0'>
                              <small>{renderDate(child.data.created_utc)}</small>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs='12' md='auto'>
                          <Row className='justify-content-start justify-content-md-end'>
                            <Col xs='auto' className='pe-2'>
                              <FontAwesomeIcon icon={['far', 'message']} size='1x' />
                            </Col>
                            <Col xs='auto' className='ps-0'>
                              <small>
                                <a href={`https://www.reddit.com${child.data.permalink}`}>{child.data.num_comments}</a>
                              </small>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  )
                })
              : 'Loading...'}

            <Col xs='12' className='text-center py-3'>
              <hr />
              <Button variant='outline-dark' className='my-2' onClick={() => dispatch(limitDataResults(limit + 5))}>
                Show more results...
              </Button>
            </Col>
          </Row>
        </main>
      </Col>
    </>
  )
}

Thread.propTypes = {
  /*author: PropTypes.string,*/
}

export default Thread
