import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { isEmpty } from 'lodash'

import Layout from '../../../common/Layout'
import styles from './Insert.module.scss'
import { addBookSchema } from '../../../../utils/schemas/addBookSchema'
import Button from '../../../common/Button'
import Camera from '../../../common/Camera'
import Modal from '../../../common/Modal'
import { t } from '../../../../utils/i18n/i18n'

const Insert = () => {
	const [isbn, setIsbn] = useState('')
	const [isCameraOn, toggleCameraOn] = useState(false)
	const { register, trigger, setValue, errors } = useForm({
		resolver: joiResolver(addBookSchema),
	})

	/**
	 * @param {string} isbnValue the isbn representation of the book
	 * @description set's the value of he react-hook formm item
	 * and the local isbn state with the value provided
	 * int he arguments
	 */
	function handleIbsnChange(isbnValue) {
		setValue('isbn', isbnValue)
		setIsbn(isbnValue)
	}

	/**
	 * @description validates the input given in parameter
	 * @param {string} field the name of the field
	 */
	function validate(field) {
		trigger([field]).then(result => {
			if (result === false) {
				// we have an error
				return true
			}
			return false
		})
	}

	/**
	 *
	 */
	async function handleAddingNewBook() {
		const isValid = await trigger(['isbn'])
		if (isValid) {
			// TODO: add the book
		}
	}

	/**
	 *
	 */
	function uploadPhoto() {
		toggleCameraOn(true)
	}

	return (
		<>
			<Layout>
				<div className={styles.outerRootContainer}>
					<div className={styles.header}>
						<h1 className={styles.title}>Add a new book</h1>
						<p className={styles.subTitle}>
							{t('screens.add-new.instructions')}
						</p>
					</div>
					<div className={styles.addContainer}>
						<ol>
							<li>
								<div>
									<p>1. {t('screens.add-new.step-1')}</p>
								</div>
								<div className={styles.inputContainer}>
									<input
										ref={() => register('isbn')}
										name="isbn"
										type="text"
										className={styles.isbnInput}
										onChange={event => handleIbsnChange(event.target.value)}
										value={isbn}
										onBlur={() => validate('isbn')}
										placeholder="enter the ISBN"
									/>
									{errors && errors.isbn && (
										<p className={styles.error}>
											{t('screens.add-new.step-1-error')}
										</p>
									)}
								</div>
							</li>
							<li>
								<div>
									<p>2. {t('screens.add-new.step-2')}</p>
									<div className={styles.buttonContainer}>
										<Button
											onClick={() => uploadPhoto()}
											disabled={false}
											label={t('screens.add-new.upload-photo')}
											variant="secondary"
										/>
									</div>
								</div>
							</li>
						</ol>
					</div>
					<div className={styles.buttonContainer}>
						<Button
							onClick={() => handleAddingNewBook()}
							disabled={!isEmpty(errors, true) || isbn.length < 10}
							label={t('screens.add-new.add-new-book')}
						/>
					</div>
				</div>
			</Layout>
			<Modal
				height="80vh"
				isVisible={isCameraOn}
				handleClose={() => toggleCameraOn(false)}
			>
				<Camera
					handleClose={() => toggleCameraOn(false)}
					isbn={isbn}
					isOpen={isCameraOn}
				/>
			</Modal>
		</>
	)
}
export default Insert
