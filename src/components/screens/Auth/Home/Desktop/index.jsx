import axios from 'axios'
import hexToRgba from 'hex-to-rgba'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import StackGrid from 'react-stack-grid'
import { orderBy } from 'lodash'
import classnames from 'classnames'

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
	const [orignalBookList, setAllBooks] = useState([])
	const [totelSumOfBooks, setTotalSumOfBooks] = useState(0)
	const [searchLogic, setSearchLogic] = useState('title')
	const [isLoading, toggleLoading] = useState(true)
	const [activeSort, setActiveSort] = useState('abc')

	const isBorrowed = isbn =>
		borrowHistory.some(
			borrow => cleanIsbn(borrow.isbn) === isbn && borrow.isBorrowed === true,
		)

	useEffect(() => {
		const history = axios.get(apiEndpoints.getBorrowHistory)
		const allBooks = axios.get(apiEndpoints.getAllBooks)
		Promise.all([history, allBooks])
			.then(results => {
				const ordered = orderBy(
					results[1].data,
					[book => book.title.toLowerCase()],
					['asc'],
				)
				setBorrowHistory(results[0].data)
				setFilteredBooks(ordered)
				setAllBooks(results[1].data)
				setTotalSumOfBooks(results[1].data.length)
			})
			.finally(() => {
				toggleLoading(false)
			})
	}, [])

	/**
	 * @param {string} providedSearchTerm the search term typed into the input
	 * @description filters the book by the provided searchterm
	 * and sets the result into the array
	 * that contains the filtered books
	 */
	function handleBookSearch(providedSearchTerm) {
		setFilteredBooks(
			searchBooks(providedSearchTerm, orignalBookList, searchLogic),
		)
	}

	/**
	 * @param {string} chosenSort string representation of the cliicked sorting logic
	 * @description sorts the array of book by the provided sorthing methid in the argument
	 * and sets the fitlered book array with the result
	 */
	function handleSort(chosenSort) {
		toggleLoading(true)
		setActiveSort(chosenSort)
		if (chosenSort === 'abc') {
			const ordered = orderBy(
				orignalBookList,
				[book => book.title.toLowerCase()],
				['asc'],
			)

			setFilteredBooks(ordered)
			toggleLoading(false)
		} else if (chosenSort === 'borrowed') {
			const borrowed = orignalBookList.filter(({ isbn }) =>
				isBorrowed(cleanIsbn(isbn)),
			)
			setFilteredBooks(borrowed)
			toggleLoading(false)
		}
	}
	return (
		<div>
			<div className={styles.searchContainer}>
				<div className={styles.left}>
					<h1>
						📖 Halkeinkiven Pikkukirjasto <span>({totelSumOfBooks})</span>
					</h1>
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
							className={classnames(
								styles.sortBtn,
								activeSort && activeSort === 'abc'
									? styles.activeSort
									: styles.notActive,
							)}
							onClick={() => handleSort('abc')}
						>
							A-Z
						</button>
						<button
							type="button"
							className={classnames(
								styles.sortBtn,
								activeSort && activeSort === 'borrowed'
									? styles.activeSort
									: styles.notActive,
							)}
							onClick={() => handleSort('borrowed')}
						>
							borrowed
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
