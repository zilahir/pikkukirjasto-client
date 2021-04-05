/* eslint-disable unicorn/consistent-function-scoping */
import React, { useState } from 'react'
import { useHistory } from 'react-router'

import qrCodeIcon from '../../../assets/icons/qr-code.svg'
import { setLanguage } from '../../../utils/i18n/i18n'
import Modal from '../Modal'
import styles from './Header.module.scss'

const Header = () => {
	const [isScanModalVisible, toggleScanModalVisible] = useState(false)
	const history = useHistory()

	/**
	 * @param chosenLanguage
	 */
	function handleLanguageChange(chosenLanguage) {
		setLanguage(chosenLanguage)
		window.location.reload(false)
	}
	return (
		<>
			<div className={styles.headerRoot}>
				<div className={styles.left}>
					<ul className={styles.languageSelector}>
						<li>
							<button type="button" onClick={() => handleLanguageChange('fi')}>
								🇫🇮
							</button>
						</li>
						<li>
							<button type="button" onClick={() => handleLanguageChange('en')}>
								🇬🇧
							</button>
						</li>
					</ul>
				</div>
				<div className={styles.right}>
					<button
						className={styles.qrCodeIcon}
						type="button"
						onClick={() => history.push('/borrow')}
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
