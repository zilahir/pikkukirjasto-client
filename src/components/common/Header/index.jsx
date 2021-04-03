import { format } from 'date-fns'
import React, { useState } from 'react'

import qrCodeIcon from '../../../assets/icons/qr-code.svg'
import Modal from '../Modal'
import styles from './Header.module.scss'

const Header = () => {
	const [isScanModalVisible, toggleScanModalVisible] = useState(false)
	return (
		<>
			<div className={styles.headerRoot}>
				<div className={styles.left}>
					<p className={styles.day}>{format(new Date(), 'd')}</p>
					<div className={styles.date}>
						<p className={styles.dayName}>{format(new Date(), 'eeee')}</p>
						<p className={styles.dayName}>{format(new Date(), 'LLLL yyyy')}</p>
					</div>
				</div>
				<div className={styles.right}>
					<button
						className={styles.qrCodeIcon}
						type="button"
						onClick={() => console.debug('pressed')}
					>
						<img src={qrCodeIcon} alt="read-qr" />
					</button>
				</div>
			</div>
			<Modal
				isVisible={isScanModalVisible}
				handleClose={() => toggleScanModalVisible(false)}
			>
				<div className={styles.qrReadContainer}>
					<p>Borring book</p>
				</div>
			</Modal>
		</>
	)
}

export default Header
