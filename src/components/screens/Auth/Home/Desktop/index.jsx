import axios from 'axios'
import hexToRgba from 'hex-to-rgba'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import StackGrid from 'react-stack-grid'
import { orderBy } from 'lodash'

import apiEndpoints from '../../../../../api/apiEndPoints'
import cleanIsbn from '../../../../../utils/helpers/cleanIsbn'
import searchBooks from '../../../../../utils/helpers/seach'
import { t } from '../../../../../utils/i18n/i18n'
import Book from '../../../../common/Book'
import Search from '../../../../common/Search'
import styles from './Desktop.module.scss'

const DesktopHome = () => {
	const [borrowHistory, setBorrowHistory] = useState([])
	const [filteredBooks, setFilteredBooks] = useState([])
	const [searchLogic, setSearchLogic] = useState('title')
	const [isLoading, toggleLoading] = useState(true)

	const isBorrowed = isbn =>
		borrowHistory.some(
			borrow => cleanIsbn(borrow.isbn) === isbn && borrow.isBorrowed === true,
		)

	useEffect(() => {
		const history = axios.get(apiEndpoints.getBorrowHistory)
		const allBooks = axios.get(apiEndpoints.getAllBooks)
		Promise.all([history, allBooks])
			.then(results => {
				setBorrowHistory(results[0].data)
				setFilteredBooks(results[1].data)
			})
			.finally(() => {
				toggleLoading(false)
			})
	}, [])

	/**
	 * @param providedSearchTerm
	 */
	function handleBookSearch(providedSearchTerm) {
		setFilteredBooks(
			searchBooks(providedSearchTerm, filteredBooks, searchLogic),
		)
	}

	/**
	 * @param chosenSort
	 */
	// eslint-disable-next-line unicorn/consistent-function-scoping
	function handleSort(chosenSort) {
		toggleLoading(true)
		if (chosenSort === 'abc') {
			const ordered = orderBy(
				filteredBooks,
				[book => book.title.toLowerCase()],
				['asc'],
			)
			console.debug(ordered)
			setFilteredBooks(ordered)
			toggleLoading(false)
		}
	}
	return (
		<div>
			<div className={styles.searchContainer}>
				<div className={styles.left}>
					<h1>📖 Halkeinkiven Pikkukirjasto</h1>
				</div>
				<div className={styles.center}>
					<input
						type="text"
						onChange={event => handleBookSearch(event.target.value)}
						placeholder={t('screens.search.search')}
					/>
					<Search
						fontColors={{
							active: '#ffffff',
							inActive: '#f4abc4',
						}}
						activebgColor={hexToRgba('#f4abc4', 1)}
						searchLogic={searchLogic}
						setSearchLogic={setSearchLogic}
					/>
				</div>
			</div>
			{filteredBooks.length > 0 && !isLoading && (
				<>
					<div className={styles.sortContainer}>
						<button
							type="button"
							className={styles.sortBtn}
							onClick={() => handleSort('abc')}
						>
							A-Z
						</button>
					</div>
					<StackGrid columnWidth={350} monitorImagesLoaded>
						{filteredBooks.map(currentBook => (
							<Book
								key={currentBook.isbn}
								isBorrowed={isBorrowed(cleanIsbn(currentBook.isbn))}
								book={{
									title: currentBook.title,
									author: currentBook.author,
									isbn: cleanIsbn(currentBook.isbn),
									cover: currentBook.cover,
								}}
							/>
						))}
					</StackGrid>
				</>
			)}
			{isLoading && (
				<div className={styles.loaderContainer}>
					<Loader type="TailSpin" color="#060930" height={100} width={100} />
				</div>
			)}
		</div>
	)
}

export default DesktopHome
