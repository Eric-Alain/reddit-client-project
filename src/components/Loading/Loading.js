//React
import React from 'react'

//Redux
import { useSelector } from 'react-redux'

//3rd party
import { Puff } from 'react-loading-icons'
import Modal from 'react-bootstrap/Modal'

const Loading = () => {
  const loading = useSelector(state => state.toggles.isLoading)

  return (
    <Modal id='loading-overlay' show={loading ? true : false} centered>
      <Modal.Body className='d-flex justify-content-center'>
        <Puff className='loading rounded' />
      </Modal.Body>
    </Modal>
  )
}

export default Loading
