/* eslint-disable unicorn/consistent-function-scoping */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import QRCode from 'react-qr-code'
import Loader from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'
import SearchIcon from '@material-ui/icons/Search'

import apiEndpoints from '../api/apiEndPoints'
import EditModal from './components/EditModal'
import AdminContext from './context/adminContext'
import styles from './Admin.module.scss'
import cleanIsbn from '../utils/helpers/cleanIsbn'
import { removeBook, setAllBooks } from '../store/actions/books'

const Admin = () => {
	const [loading, setLoading] = useState(true)
	const [borrowHistory, setBorrowHistory] = useState([])
	const [isEditModalOpen, toggleEditModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState()
	const dispatch = useDispatch(9)
	const { allBooks } = useSelector(store => store.books)
	const [openSnackbar] = useSnackbar()

	/**
	 *
	 */
	function getBookList() {
		setLoading(true)
		return new Promise(resolve => {
			axios.get(apiEndpoints.getAllBooks).then(response => {
				dispatch(setAllBooks(response.data))
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
	 * @param isbnToDelete
	 * @param book
	 */
	function deleteBook(book) {
		axios.delete(`${apiEndpoints.deleteBook}/${book.isbn}`).then(() => {
			openSnackbar(`book: ${book.title} had been deleted!`)
			dispatch(removeBook(book.isbn))
		})
	}

	/**
	 *
	 */
	function handlelSearch() {
		console.debug('pressed')
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
		<AdminContext.Provider
			value={{
				selectedBook,
				setSelectedBook,
			}}
		>
			<header className={styles.header}>
				<div className={styles.info}>
					<h1>
						<span>tällä hetkellä: {allBooks.length}</span>
						<span>tällä hetkellä lainassa: {currentlyBorrowed().length}</span>
					</h1>
				</div>
				<div className={styles.search}>
					<button onClick={() => handlelSearch()} type="button">
						<SearchIcon fontSize="large" />
					</button>
				</div>
			</header>
			<div className={styles.adminRoot}>
				<div className={styles.signs}>
					<p className={styles.in}>in library</p>
					<p className={styles.out}>borrowed</p>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<td>image</td>
							<td>info</td>
							<td>qrcode</td>
							<td>actions</td>
						</tr>
					</thead>
					<tbody>
						{!loading &&
							allBooks.map(file => (
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
									<td>
										<p>{file.isbn}</p>
										<p>{file.author}</p>
										<p>{file.title}</p>
									</td>
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
			</div>
		</AdminContext.Provider>
	)
}

export default Admin
