//React
import React from 'react'

//3rd party
import PropTypes from "prop-types"
import Img from 'react-cool-img'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThreadModal = ({ show, onHide, img}) => {  
  return (
    <Modal show={show} onHide={onHide} dialogClassName='thread-modal' keyboard={false}>
      <Modal.Header className='justify-content-end mx-3 py-1 px-0'>
        <button className="lh-0 rounded" onClick={onHide}>
          <FontAwesomeIcon className='modal-close' icon={['fas', 'xmark']} size='2x' />
        </button>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Img className='w-100 rounded' src={img} alt={''} />
      </Modal.Body>
    </Modal>
  )
}

ThreadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired
}

export default ThreadModal