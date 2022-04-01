//React
import React from 'react'

//Components
import ThreadModal from '../Thread/ThreadModal'
import { renderDate, nFormatter } from '../../utils/utils'

//3rd party
import registerIcons from '../../icons/icons'
import Img from 'react-cool-img'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

registerIcons()

const ThreadMapper = ({ data, setActiveModal, setInactiveModal, modalData }) => {
  //console.log(setActiveModal, setInactiveModal)
  return (
    <>
      {data.children.map((child, i) => {
        return (
          <article key={i}>
            <h3>
              <a href={child.data.url}>{child.data.title}</a>
            </h3>
            <div onClick={() => setActiveModal(i)} onKeyDown={() => setActiveModal(i)} data-testid='img-container'>
              <Img src={child.data.preview.images[0].source.url.toString()} alt='thread-img' />
            </div>
            <ThreadModal show={true} onHide={() => setInactiveModal()} img={child.data.preview.images[0].source.url.toString()} />
            <FontAwesomeIcon icon={['fab', 'reddit-square']} />
            <small>
              <a href={`https://www.reddit.com/user/${child.data.author}`}>{child.data.author}</a> |{' '}
              <a href={`https://www.reddit.com/${child.data.subreddit_name_prefixed}`}>{child.data.subreddit_name_prefixed}</a>:{' '}
              <span>{nFormatter(child.data.subreddit_subscribers, 1)}</span>
            </small>
            <FontAwesomeIcon icon={['far', 'calendar-days']} />
            <small>{renderDate(child.data.created_utc)}</small>
            <FontAwesomeIcon icon={['far', 'message']} />
            <small>
              <a href={`https://www.reddit.com${child.data.permalink}`}>{child.data.num_comments}</a>
            </small>
          </article>
        )
      })}
    </>
  )
}

export default ThreadMapper
