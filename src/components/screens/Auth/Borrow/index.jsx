/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { has } from 'lodash'
import QrReader from 'modern-react-qr-reader'
import Layout from '../../../common/Layout'

import styles from './Borrow.module.scss'

const Borrow = () => {
	const [isbn, setIsbn] = useState()
	const [isError, toggleError] = useState(false)

	/**
	 * @param data
	 */
	function handleQrRead(data) {
		if (data) {
			try {
				const json = JSON.parse(data)
				if (has(json, 'isbn')) {
					alert('ths is a valid qr', json.isbn)
				}
			} catch (error) {
				console.error(error)
				toggleError(true)
			}
			setIsbn(data)
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
