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
import { t } from '../../../../utils/i18n/i18n'

const Borrow = () => {
	const [isbn, setIsbn] = useState()
	const [isError, toggleError] = useState(false)
	const [isSuccess, toggleSuccess] = useState(false)
	const history = useHistory()

	/**
	 * @param {string} data stringied json of he data
	 * that contains the ISBn code of the book
	 * on a QR code
	 * @description parses the (mal)formatted json
	 * and calls the API, that will set to book as borrowed
	 * in the database
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
	 * @description goes back in the browser's history
	 */
	function goBack() {
		toggleSuccess(false)
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
				{!isSuccess && (
					<>
						<h1 className={styles.title}>{t('misc.read-qr')}</h1>
						<QrReader delay={1000} onScan={handleQrRead} />
					</>
				)}
				{isSuccess && (
					<div className={styles.successContainer}>
						<div className={styles.innerContanier}>
							<p>{t('screens.borrow.thank-you')}</p>
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
