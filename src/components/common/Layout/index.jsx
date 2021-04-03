import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import styles from './Layout.module.scss'

const pageVariants = {
	initial: {
		opacity: 0,
		x: '-100vw',
		scale: 0.8,
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1,
	},
	out: {
		opacity: 0,
		x: '100vw',
		scale: 1.2,
	},
}

const Layout = ({ children }) => (
	<motion.div
		transition={{
			type: 'tween',
			ease: 'anticipate',
			duration: 0.5,
		}}
		variants={pageVariants}
		className={styles.layoutRootContainer}
		initial="initial"
		animate="in"
		exit="out"
	>
		{children}
	</motion.div>
)

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
}

export default Layout
