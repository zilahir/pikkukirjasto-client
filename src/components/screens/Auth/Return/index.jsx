/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { has } from 'lodash'
import classnames from 'classnames'
import QrReader from 'modern-react-qr-reader'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'
import dJSON from 'dirty-json'

import Layout from '../../../common/Layout'
import styles from '../Borrow/Borrow.module.scss'
import apiEndpoints from '../../../../api/apiEndPoints'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'
import Button from '../../../common/Button'
import { t } from '../../../../utils/i18n/i18n'

const Borrow = () => {
	const [isbn, setIsbn] = useState()
	const [isError, toggleError] = useState(false)
	const currentLocation = useLocation()
	const [isSuccess, toggleSuccess] = useState(false)
	const history = useHistory()

	/**
	 * @param data
	 */
	function handleQrRead(data) {
		if (data) {
			try {
				const json = dJSON.parse(data)
				if (has(json, 'isbn') && !isSuccess) {
					axios
						.patch(apiEndpoints.returnBook, {
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
							<p>{t('screens.return.thank-you')}</p>
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
