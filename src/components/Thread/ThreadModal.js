import React from 'react'
//import PropTypes from "prop-types"
//import { useDispatch, useSelector } from 'react-redux'

//import Img from 'react-cool-img'
//import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

//Fontawesome
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThreadModal = ({id, show, onHide, title}) => {
 console.log(show)
  
  return (
    <Modal id={id} show={show} onHide={onHide} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>{title}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary'>Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ThreadModal