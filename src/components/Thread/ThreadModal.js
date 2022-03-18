import React from 'react'
//import PropTypes from "prop-types"
//import { useDispatch, useSelector } from 'react-redux'

//import Img from 'react-cool-img'
//import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'

import Img from 'react-cool-img'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThreadModal = ({id, show, onHide, title, img}) => {
 console.log(show)
  
  return (
    <Modal id={id} show={show} onHide={onHide} dialogClassName='thread-modal' keyboard={false}>
      <Modal.Header className='justify-content-end mx-3 py-1 px-0'>
        <button className="lh-0 rounded" onClick={onHide}>
          <FontAwesomeIcon className='modal-close' icon={['fas', 'xmark']} size='2x' />
        </button>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Img className='w-100' src={img} alt={''} />
      </Modal.Body>
    </Modal>
  )
}

export default ThreadModal