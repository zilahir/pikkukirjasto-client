/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { has } from 'lodash'
import QrReader from 'modern-react-qr-reader'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'
import dJSON from 'dirty-json'
import classnames from 'classnames'

import Layout from '../../../common/Layout'
import styles from './Borrow.module.scss'
import apiEndpoints from '../../../../api/apiEndPoints'
import Button from '../../../common/Button'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'

const Borrow = () => {
	const [isbn, setIsbn] = useState()
	const [isError, toggleError] = useState(false)
	const [isSuccess, toggleSuccess] = useState(true)
	const history = useHistory()

	/**
	 * @param data
	 */
	function handleQrRead(data) {
		if (data) {
			try {
				const json = dJSON.parse(data)
				if (has(json, 'isbn')) {
					axios
						.post(apiEndpoints.createNewBorrow, {
							isbn: cleanIsbn(json.isbn),
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

	/**
	 *
	 */
	function goBack() {
		history.push('/')
	}
	return (
		<Layout>
			<div
				className={classnames(
					styles.borrowContainer,
					isSuccess ? styles.extend : '',
				)}
			>
				{!isSuccess && <QrReader delay={3000} onScan={handleQrRead} />}
				{isSuccess && (
					<div className={styles.successContainer}>
						<div className={styles.innerContanier}>
							<p>Thank you for borrowing this book! ❤️</p>
							<div className={styles.btnContainer}>
								<Button label="Go Back" onClick={() => goBack()} />
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Borrow
