import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { wrap } from 'popmotion'

import onBoardContent from '../../../api/onBoard/onBoad'
import styles from './OnBoard.module.scss'

const variants = {
	enter: direction => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: direction => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
}

const OnBoard = () => {
	const [[page, direction], setPage] = useState([0, 0])

	const paginate = newDirection => {
		setPage([page + newDirection, newDirection])
	}

	const imageIndex = wrap(0, onBoardContent.length, page)

	return (
		<div className={styles.onBoadRootContainer}>
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={page}
					custom={direction}
					className={styles.onBoardItem}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: 'spring', stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
				>
					{onBoardContent[imageIndex].title}
					<button type="button" onClick={() => paginate(1)}>
						next
					</button>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default OnBoard
