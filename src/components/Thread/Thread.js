import * as React from "react"
//import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Thread = () => (
  <Col
    xs={{ span: 12, order: 2 }}
    md={{ span: 9, order: 1 }}
    className="border"
  >
    <main>
      <Row>
        <Col xs="12" className="py-3">
          <h2>I am the thread component</h2>
          <p>Image here</p>
        </Col>
      </Row>
    </main>
  </Col>
)

Thread.propTypes = {
  /*author: PropTypes.string,*/
}

export default Thread
