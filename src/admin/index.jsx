/* eslint-disable unicorn/consistent-function-scoping */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import QRCode from 'react-qr-code'
import Loader from 'react-loader-spinner'
import apiEndpoints from '../api/apiEndPoints'
import EditModal from './components/EditModal'
import AdminContext from './context/adminContext'

import styles from './Admin.module.scss'
import cleanIsbn from '../utils/helpers/cleanIsbn'

const Admin = () => {
	const [loading, setLoading] = useState(true)
	const [borrowHistory, setBorrowHistory] = useState([])
	const [isEditModalOpen, toggleEditModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState()
	const [bookList, setBookList] = useState([])

	/**
	 *
	 */
	function getBookList() {
		setLoading(true)
		return new Promise(resolve => {
			axios.get(apiEndpoints.getAllBooks).then(response => {
				setBookList(response.data)
				resolve()
				setLoading(false)
			})
		})
	}

	useEffect(() => {
		getBookList()
	}, [])

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
		alert('soon', toDelete)
	}

	/**
	 * @param toReturn
	 */
	function returnBook(toReturn) {
		axios
			.patch(apiEndpoints.returnBook, {
				isbn: cleanIsbn(toReturn.isbn),
			})
			.then(() => {
				getBookList()
			})
	}
	return (
		<div className={styles.adminRoot}>
			<AdminContext.Provider
				value={{
					selectedBook,
					setSelectedBook,
				}}
			>
				<h1>tällä hetkellä: {bookList.length}</h1>
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
							<td>qrcode</td>
							<td>actions</td>
						</tr>
					</thead>
					<tbody>
						{!loading &&
							bookList.map(file => (
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
									<td>
										<QRCode value={JSON.stringify({ isbn: file.isbn })} />
									</td>
									<td className={styles.actionBtnContainer}>
										<button type="button" onClick={() => returnBook(file)}>
											RETURN BOOK
										</button>
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
				{loading && (
					<div className={styles.loadingContainer}>
						<Loader type="TailSpin" color="#060930" height={100} width={100} />
					</div>
				)}
				<EditModal
					isVisible={isEditModalOpen}
					handleClose={() => toggleEditModal(false)}
				/>
			</AdminContext.Provider>
		</div>
	)
}

export default Admin
