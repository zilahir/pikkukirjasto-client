/* eslint-disable unicorn/consistent-function-scoping */
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

const Insert = () => {
	const [isbn, setIsbn] = useState('978-951-0-42301-1')
	const [isCameraOn, toggleCameraOn] = useState(false)
	const { register, trigger, setValue, errors } = useForm({
		resolver: joiResolver(addBookSchema),
	})

	/**
	 * @param isbnValue
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
							Too add a new book into the library, please follow these few easy
							steps
						</p>
					</div>
					<div className={styles.addContainer}>
						<ol>
							<li>
								<div>
									<p>1. Type the ISBN number of the book</p>
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
											Pleae check the ISBN number you entered
										</p>
									)}
								</div>
							</li>
							<li>
								<div>
									<p>
										2. Create a photo of the front cover of the book, using your
										phone camera
									</p>
									<div className={styles.buttonContainer}>
										<Button
											onClick={() => uploadPhoto()}
											disabled={false}
											label="Upload Photo"
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
							label="Add new book"
						/>
					</div>
				</div>
			</Layout>
			<Modal
				height="80vh"
				isVisible={isCameraOn}
				handleClose={() => toggleCameraOn(false)}
			>
				<Camera isbn={isbn} isOpen={isCameraOn} />
			</Modal>
		</>
	)
}
export default Insert
