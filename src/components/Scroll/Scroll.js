//React
import React from 'react'

//3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Scroll = () => {
  //Handler
  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` })
  }

  return (
    <div id='scroll-top'>
      <button className='lh-0 py-1 rounded' onClick={handleClick} aria-label='Back to top'>
        <FontAwesomeIcon icon={['fas', 'arrow-up']} size='1x' />
      </button>
    </div>
  )
}

export default Scroll
