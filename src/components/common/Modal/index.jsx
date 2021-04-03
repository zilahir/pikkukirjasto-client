import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import ReactDOM from 'react-dom'

import styles from './Modal.module.scss'

const Modal = ({ children, height, isVisible, handleClose }) => {
	const modalVariants = {
		visible: {
			height,
			opacity: 1,
			y: 0,
		},
		hidden: {
			height: 0,
			y: -height + 100,
			opacity: 0,
		},
		exit: {
			height: 0,
			y: -height + 100,
			opacity: 0,
		},
	}
	return (
		<>
			<AnimatePresence key={{ isVisible }}>
				{isVisible && (
					<motion.div
						variants={modalVariants}
						animate={isVisible ? 'visible' : 'hidden'}
						initial="hidden"
						exit="exit"
						className={styles.modalContainer}
					>
						<div className={styles.innerContainer}>{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
			{isVisible &&
				ReactDOM.createPortal(
					// eslint-disable-next-line jsx-a11y/control-has-associated-label
					<div
						className={styles.overlay}
						onKeyDown={undefined}
						tabIndex={-1}
						onClick={handleClose}
						role="button"
					/>,
					document.querySelector('#root'),
				)}
		</>
	)
}

Modal.defaultProps = {
	height: '80vh',
}

Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	height: PropTypes.number,
	handleClose: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
}

export default Modal
