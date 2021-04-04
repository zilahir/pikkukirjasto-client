import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { isEmpty } from 'lodash'

import Layout from '../../../common/Layout'
import styles from './Insert.module.scss'
import { addBookSchema } from '../../../../utils/schemas/addBookSchema'

const Insert = () => {
	const [isbn, setIsbn] = useState('')
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

	console.debug('errors', errors)

	return (
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
							<div className={styles.buttonContainer}>
								<button
									type="button"
									onClick={() => handleAddingNewBook()}
									disabled={!isEmpty(errors, true) || isbn.length < 10}
								>
									Add new book
								</button>
							</div>
						</li>
					</ol>
				</div>
			</div>
		</Layout>
	)
}
export default Insert
