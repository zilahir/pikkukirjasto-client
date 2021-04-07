import axios from 'axios'
import hexToRgba from 'hex-to-rgba'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-fetching-library'
import StackGrid from 'react-stack-grid'
import apiEndpoints from '../../../../../api/apiEndPoints'
import cleanIsbn from '../../../../../utils/helpers/cleanIsbn'
import searchBooks from '../../../../../utils/helpers/seach'
import { t } from '../../../../../utils/i18n/i18n'
import Book from '../../../../common/Book'
import Search from '../../../../common/Search'
import styles from './Desktop.module.scss'

const fetchBookList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const DesktopHome = () => {
	const { loading, payload } = useQuery(fetchBookList)
	const [borrowHistory, setBorrowHistory] = useState([])
	const [serachTerm, setSearchTerm] = useState('')
	const [filteredBooks, setFilteredBooks] = useState([])
	const [searchLogic, setSearchLogic] = useState('title')

	const isBorrowed = isbn =>
		borrowHistory.some(
			borrow => cleanIsbn(borrow.isbn) === isbn && borrow.isBorrowed === true,
		)

	useEffect(() => {
		axios.get(apiEndpoints.getBorrowHistory).then(result => {
			setBorrowHistory(result.data)
		})
	}, [])

	/**
	 * @param providedSearchTerm
	 */
	function handleBookSearch(providedSearchTerm) {
		setSearchTerm(providedSearchTerm)
		setFilteredBooks(searchBooks(providedSearchTerm, payload, searchLogic))
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
			{!loading && serachTerm.length === 0 && (
				<StackGrid columnWidth={350} monitorImagesLoaded>
					{payload.map(currentBook => (
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
			)}
			{serachTerm.length > 0 && filteredBooks.length > 0 && (
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
			)}
		</div>
	)
}

export default DesktopHome
