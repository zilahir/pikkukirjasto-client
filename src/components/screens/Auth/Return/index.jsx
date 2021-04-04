/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { has } from 'lodash'
import QrReader from 'modern-react-qr-reader'
import { useLocation } from 'react-router'
import axios from 'axios'
import dJSON from 'dirty-json'

import Layout from '../../../common/Layout'
import styles from '../Borrow/Borrow.module.scss'
import apiEndpoints from '../../../../api/apiEndPoints'

const Borrow = () => {
	const [isbn, setIsbn] = useState()
	const [isError, toggleError] = useState(false)
	const currentLocation = useLocation()
	const [isSuccess, toggleSuccess] = useState(false)

	/**
	 * @param data
	 */
	function handleQrRead(data) {
		if (data) {
			try {
				const json = dJSON.parse(data)
				if (has(json, 'isbn')) {
					axios
						.patch(apiEndpoints.returnBook, {
							isbn: json.isbn,
						})
						.then(() => {
							toggleSuccess(true)
						})
				}
			} catch {
				toggleError(true)
			}
			setIsbn(data)
		}
	}
	return (
		<Layout>
			<div className={styles.borrowContainer}>
				<QrReader delay={3000} onScan={handleQrRead} />
			</div>
		</Layout>
	)
}

export default Borrow
