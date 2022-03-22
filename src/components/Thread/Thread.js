//React
import React, { useEffect, useRef } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, limitDataResults } from '/src/state/actions/data'
import { setModalData, toggleModal } from '/src/state/actions/toggles'

//Utils
import ThreadModal from '/src/components/Thread/ThreadModal'
import { animations } from '/src/components/Thread/animations'
import { htmlDecode, renderDate, nFormatter } from '/src/utils/utils'

//3rd party
import Img from 'react-cool-img'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Thread = () => {
  //Redux
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.reddit.data)
  const limit = useSelector(state => state.data.limit)
  const modalData = useSelector(state => state.toggles.modalData)

  //Refs
  const refArr = useRef([])
  refArr.current = []

  const addToRefs = el => {
    if (el && !refArr.current.includes(el)) {
      refArr.current.push(el)
    }
  }

  //Handlers
  const setActiveModal = index => {
    dispatch(setModalData({ activeModal: index }))
    dispatch(toggleModal(true))
  }

  const setInactiveModal = index => {
    dispatch(setModalData({ activeModal: null }))
    dispatch(toggleModal(false))
  }

  //UseEffects
  useEffect(() => {
    fetch('https://www.reddit.com/search.json?q=web%20dev')
      .then(response => response.json())
      .then(data => {
        dispatch(fetchData(data))
      })
    animations(refArr.current)
  }, [dispatch])

  //Intentionally want this to run on every render
  //Want to re-evaluate how many refs need to be animated
  useEffect(() => {
    animations(refArr.current)
  })

  return (
    <>
      <Col xs={{ span: 12, order: 2 }} sm={{ span: 7, order: 1 }} md={{ span: 8, order: 1 }} xl={{ span: 9, order: 1 }} id='thread' className='bg-2'>
        <section>
          <Row>
            <Col xs='12'>
              <h2 className='mt-3 mb-2'>Thread</h2>
              <hr className='my-0' />
            </Col>

            {/*Map data to DOM once available, limit results based on state limit*/}
            {data !== undefined ? (
              data.children.slice(0, limit ? limit : data.children.length).map((child, i) => {
                return (
                  <article key={i}>
                    <Col xs='12' className='py-3 mb-3' ref={addToRefs}>
                      <h3>
                        <a href={child.data.url}>{child.data.title}</a>
                      </h3>
                      <div className='img-container' onClick={() => setActiveModal(i)} onKeyDown={() => setActiveModal(i)} role='button' tabIndex='0'>
                        <Img
                          className='thread-img w-100 rounded'
                          src={child.data.preview !== undefined ? htmlDecode(child.data.preview.images[0].source.url.toString()) : 'http://placekitten.com/g/480/320'}
                          alt={''}
                        />
                      </div>
                      <ThreadModal
                        show={modalData.activeModal === i}
                        onHide={() => setInactiveModal(i)}
                        img={child.data.preview !== undefined ? htmlDecode(child.data.preview.images[0].source.url.toString()) : 'http://placekitten.com/g/480/320'}
                      />
                      <hr />
                      <Row className='align-items-start justify-content-start justify-content-lg-between'>
                        <Col xs='12' lg='7' xl='8'>
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
                        <Col xs='12' lg='auto'>
                          <Row className='justify-content-start justify-content-lg-end'>
                            <Col xs='auto' className='pe-2'>
                              <FontAwesomeIcon icon={['far', 'calendar-days']} size='1x' />
                            </Col>
                            <Col xs='auto' className='ps-0'>
                              <small>{renderDate(child.data.created_utc)}</small>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs='12' lg='auto'>
                          <Row className='justify-content-start justify-content-lg-end'>
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
                  </article>
                )
              })
            ) : (
              /*If data unavailable, insert a placeholder element*/
              <article>
                <Col xs='12' className='py-3 mb-1' key={0} ref={addToRefs}>
                  <Col xs='12' className='loading-placeholder loading-pulse rounded'></Col>
                  <div className='img-container'>
                    <Img className='thread-img rounded loading loading-pulse' src={null} alt={null} />
                  </div>
                </Col>
              </article>
            )}

            {/*Load more element*/}
            <Col xs='12' className='text-center py-3'>
              <hr />
              <button
                className='more-btn my-2 p-2 rounded'
                onClick={() => {
                  dispatch(limitDataResults(limit + 5))
                }}
              >
                Show more results...
              </button>
            </Col>
          </Row>
        </section>
      </Col>
    </>
  )
}

export default Thread
