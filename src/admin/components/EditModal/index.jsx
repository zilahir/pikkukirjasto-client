/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { saveSvgAsPng } from 'save-svg-as-png'
import slugify from 'slugify'
import { useSnackbar } from 'react-simple-snackbar'
import QRCode from 'react-qr-code'
import axios from 'axios'

import styles from './EditModal.module.scss'
import adminContext from '../../context/adminContext'
import UploadFile from '../../../components/common/UploadFile'
import apiEndpoints from '../../../api/apiEndPoints'

const EditModal = ({ isVisible, handleClose }) => {
	const { selectedBook } = useContext(adminContext)
	const [author, setAuthor] = useState(false)
	const [title, setTitle] = useState(false)
	const [isbn, setIsbn] = useState(false)
	const [bookCover, setBookCover] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [openSnackbar] = useSnackbar()
	const [isModified, toggleModified] = useState(false)

	useEffect(() => {
		if (selectedBook) {
			setAuthor(selectedBook.author)
			setIsbn(selectedBook.isbn)
			setTitle(selectedBook.title)
			setBookCover(selectedBook.cover)
		}
	}, [selectedBook])

	/**
	 *
	 */
	function reset() {
		setAuthor(false)
		setTitle(false)
		setIsbn(false)
		setBookCover(false)
		setIsSaved(false)
	}

	/**
	 *
	 */
	function addBook() {
		const newBook = {
			author,
			title,
			isbn,
			cover: bookCover,
		}
		axios.post(apiEndpoints.saveBook, newBook).then(result => {
			setIsSaved(true)
			openSnackbar(`${title} book is successfully added!`)
		})
	}

	/**
	 * @param {string} coverUrl the string representation
	 * fo the book's cover
	 */
	function handleBookCover(coverUrl) {
		setBookCover(coverUrl.url)
	}

	/**
	 * @description checks if every field is filled
	 * if yes, it will return true
	 * false otherwise
	 * @returns {boolean} whether the book is saveable
	 */
	function checkIfSaveAble() {
		const logic = [author, title, isbn]
		const isValid = logic.every(l => l === true)
		return isValid
	}

	/**
	 * @description creates a new object of the book
	 * and calles the PATCH api to modify a book
	 */
	function modify() {
		const modifyObject = {
			isbn,
			title,
			author,
			cover: bookCover,
		}
		axios.patch(`${apiEndpoints.modifyBook}/${isbn}`, modifyObject).then(() => {
			openSnackbar(`${title} book is successfully modified!`)
			toggleModified(true)
		})
	}

	/**
	 * @description creates a downloadabe file of the
	 * book's QR code that contains the isbn
	 */
	function downloadThisQr() {
		saveSvgAsPng(
			document.querySelector('#qrContainer svg'),
			`qr-${slugify(title)}`,
		)
	}

	/**
	 * @description closes the edit modal
	 */
	function closeAndRefresh() {
		handleClose()
	}

	return (
		isVisible &&
		ReactDOM.createPortal(
			<>
				<div className={styles.editModalRootContainer}>
					<div className={styles.innerContainer}>
						<div className={styles.bookMetaContainer}>
							<div className={styles.photoContainer}>
								{bookCover && <img src={bookCover} alt="cover" />}
							</div>
						</div>
						<div className={styles.meta}>
							{isbn && (
								<div id="qrContainer" className={styles.qrContainer}>
									<QRCode
										size="100"
										renderAs="canvas"
										value={JSON.stringify({ isbn })}
									/>
									<button
										disabled={title.length === 0}
										type="button"
										onClick={() => downloadThisQr()}
									>
										download qr
									</button>
								</div>
							)}
							<div className={styles.inputs}>
								<input
									type="text"
									onChange={event => setTitle(event.target.value)}
									placeholder="Title of the book"
									value={title || ''}
								/>
								<input
									type="text"
									onChange={event => setAuthor(event.target.value)}
									placeholder="Author of the book"
									value={author || ''}
								/>
								<input
									type="text"
									onChange={event => setIsbn(event.target.value)}
									placeholder="ISBN"
									value={isbn || ''}
								/>
								<UploadFile getBackUrl={url => handleBookCover(url)} />
							</div>
							{!selectedBook && (
								<button
									type="button"
									className={styles.addButton}
									disabled={
										isbn.length === 0 ||
										title.length === 0 ||
										author.length === 0
									}
									onClick={() => addBook()}
								>
									add this book to the library
								</button>
							)}
							{selectedBook && (
								<button
									type="button"
									className={styles.addButton}
									onClick={() => modify()}
								>
									modify this book
								</button>
							)}
							{isSaved && (
								<button type="button" onClick={() => reset()}>
									add new book
								</button>
							)}
							{isModified && (
								<button type="button" onClick={() => closeAndRefresh()}>
									close and refresh
								</button>
							)}
						</div>
					</div>
				</div>
				<div
					className={styles.overlay}
					role="button"
					onKeyDown={undefined}
					tabIndex={-1}
					onClick={handleClose}
				/>
			</>,
			document.querySelector('#root'),
		)
	)
}

EditModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
}

export default EditModal
