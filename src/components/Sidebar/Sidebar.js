import * as React from "react"
import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Sidebar = () => (
  <Col xs="3" className="border py-3">
    <aside>
      <Row>
        <Col xs="12">
          <h2>Sidebar component</h2>
          <ul>
            <li>
              <a href="#">Subreddit item</a>
            </li>
            <li>
              <a href="#">Subreddit item</a>
            </li>
            <li>
              <a href="#">Subreddit item</a>
            </li>
            <li>
              <a href="#">Subreddit item</a>
            </li>
            <li>
              <a href="#">Subreddit item</a>
            </li>
          </ul>
        </Col>
      </Row>
    </aside>
  </Col>
)

Sidebar.propTypes = {
  /*author: PropTypes.string,*/
}

export default Sidebar
