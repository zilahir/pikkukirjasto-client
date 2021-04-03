import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { motion } from 'framer-motion'
import styles from './Tab.module.scss'

const Tab = ({ icon, isActive, onClick, label }) => (
	<li className={styles.tabContainer}>
		<button
			onClick={onClick}
			type="button"
			className={classnames(styles.tab, isActive ? styles.active : '')}
		>
			{icon} <span>{label}</span>
		</button>
		{isActive && (
			<motion.div
				transition={{ duration: 0.2 }}
				className={styles.activeTab}
				layoutId="selected"
			/>
		)}
	</li>
)

Tab.defaultProps = {
	isActive: false,
}

Tab.propTypes = {
	icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
		.isRequired,
	isActive: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Tab
