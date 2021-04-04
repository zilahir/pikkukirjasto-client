import React, { useState } from 'react'
import QrReader from 'modern-react-qr-reader'
import Layout from '../../../common/Layout'

import styles from './Borrow.module.scss'

const Borrow = () => {
	const [isbn, setIsbn] = useState()

	/**
	 * @param data
	 */
	function handleQrRead(data) {
		if (data) {
			console.debug('data', data)
			setIsbn(data)
			console.debug('isbn', isbn)
		}
	}
	return (
		<Layout>
			<div className={styles.borrowContainer}>
				<QrReader delay={300} onScan={handleQrRead} />
				<p>isbn: {isbn}</p>
			</div>
		</Layout>
	)
}

export default Borrow
