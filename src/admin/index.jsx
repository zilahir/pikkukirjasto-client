/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { useQuery } from 'react-fetching-library'
import apiEndpoints from '../api/apiEndPoints'
import EditModal from './components/EditModal'
import AdminContext from './context/adminContext'

import styles from './Admin.module.scss'
import cleanIsbn from '../utils/helpers/cleanIsbn'

const fetchFileList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const Admin = () => {
	const { loading, payload, error, query, reset, abort } = useQuery(
		fetchFileList,
	)
	const [borrowHistory, setBorrowHistory] = useState([])
	const [isEditModalOpen, toggleEditModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState()

	const isBorrowed = isbn =>
		borrowHistory.some(
			borrow => cleanIsbn(borrow.isbn) === isbn && borrow.isBorrowed === true,
		)

	/**
	 * @param book
	 */
	function selectBook(book) {
		toggleEditModal(true)
		setSelectedBook(book)
	}

	useEffect(() => {
		axios.get(apiEndpoints.getBorrowHistory).then(result => {
			setBorrowHistory(result.data)
		})
	}, [])

	const currentlyBorrowed = () =>
		borrowHistory.filter(borrow => borrow.isBorrowed)

	/**
	 * @param toDelete
	 */
	function deleteBook(toDelete) {
		alert('soon')
	}
	return (
		<div className={styles.adminRoot}>
			<AdminContext.Provider
				value={{
					selectedBook,
					setSelectedBook,
				}}
			>
				<h1>tällä hetkellä: {payload ? payload.length : 0}</h1>
				<h1>tällä hetkellä lainassa: {currentlyBorrowed().length}</h1>
				<div className={styles.signs}>
					<p className={styles.in}>in library</p>
					<p className={styles.out}>borrowed</p>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<td>image</td>
							<td>isbn</td>
							<td>actions</td>
						</tr>
					</thead>
					<tbody>
						{!loading &&
							payload.map(file => (
								<tr
									key={file.isbn}
									className={classnames(
										isBorrowed(cleanIsbn(file.isbn))
											? styles.borrowed
											: styles.notBorrowed,
									)}
								>
									<td>
										<img alt="book" src={file.cover} />
									</td>
									<td>{file.isbn}</td>
									<td className={styles.actionBtnContainer}>
										<button type="button" onClick={() => selectBook(file)}>
											EDIT
										</button>
										<button type="button" onClick={() => deleteBook(file)}>
											DELETE
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<EditModal
					isVisible={isEditModalOpen}
					handleClose={() => toggleEditModal(false)}
				/>
			</AdminContext.Provider>
		</div>
	)
}

export default Admin
