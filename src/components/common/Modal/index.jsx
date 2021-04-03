import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children }) => <div>{children}</div>

Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
}

export default Modal
