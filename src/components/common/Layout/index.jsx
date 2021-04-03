import React from 'react'
import PropTypes from 'prop-types'

import styles from './Layout.module.scss'

const Layout = ({ children }) => (
	<div className={styles.layoutRootContainer}>{children}</div>
)

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
}

export default Layout
