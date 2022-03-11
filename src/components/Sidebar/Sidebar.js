import * as React from 'react'
//import PropTypes from "prop-types"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Sidebar = () => (
  <Col xs={{ span: 12, order: 1 }} md={{ span: 3, order: 2 }} className='border pb-3'>
    <aside>
      <Row>
        <Col xs='12'>
          <h2 className='mt-3 mb-2'>Sidebar component</h2>
          <hr className='mt-0' />
        </Col>
        <Col xs='12'>
          <ul>
            <li>
              <a href='https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md'>Subreddit item</a>
            </li>
            <li>
              <a href='https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md'>Subreddit item</a>
            </li>
            <li>
              <a href='https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md'>Subreddit item</a>
            </li>
            <li>
              <a href='https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md'>Subreddit item</a>
            </li>
            <li>
              <a href='https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md'>Subreddit item</a>
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
