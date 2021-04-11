/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import classnames from 'classnames'
import { useQuery } from 'react-fetching-library'
import Loader from 'react-loader-spinner'
import { AnimateSharedLayout, motion } from 'framer-motion'

import SearchComponent from '../../../common/Search'
import apiEndpoints from '../../../../api/apiEndPoints'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'
import { t } from '../../../../utils/i18n/i18n'
import Book from '../../../common/Book'
import Button from '../../../common/Button'
import Layout from '../../../common/Layout'
import styles from './Search.module.scss'
import searchBooks from '../../../../utils/helpers/seach'

const fetchBookList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, toggleLoading] = useState(false)
	const { loading, payload } = useQuery(fetchBookList)
	const [filteredBooks, setFilteredBooks] = useState([])
	const [searchLogic, setSearchLogic] = useState('title')

	const isCurrentlyLoading = isLoading || loading

	/**
	 * @param {string} givenSearchTerm the search term typed into the input
	 * @description performs a search with the provided searchterm, and sets the
	 * filtered book array with the result
	 */
	function handleSearch(givenSearchTerm) {
		setSearchTerm(givenSearchTerm)
		setFilteredBooks(searchBooks(givenSearchTerm, payload, searchLogic))
	}
	return (
		<Layout>
			<div className={styles.searchContanier}>
				<input
					type="text"
					onChange={event => handleSearch(event.target.value)}
					className={styles.searchInput}
					placeholder={t('screens.search.search')}
				/>
				<SearchComponent
					setSearchLogic={setSearchLogic}
					searchLogic={searchLogic}
				/>
			</div>
			{!isCurrentlyLoading && searchTerm.length === 0 && (
				<div className={styles.bookContainer}>
					{payload.map(currentBook => (
						<Book
							role="search"
							book={{
								author: currentBook.author,
								title: currentBook.title,
								isbn: cleanIsbn(currentBook.isbn),
								cover: currentBook.cover,
							}}
						/>
					))}
				</div>
			)}
			{!isCurrentlyLoading && filteredBooks.length > 0 && (
				<div className={styles.bookContainer}>
					{filteredBooks.map(currentBook => (
						<Book
							role="search"
							book={{
								author: currentBook.author,
								title: currentBook.title,
								isbn: cleanIsbn(currentBook.isbn),
								cover: currentBook.cover,
							}}
						/>
					))}
				</div>
			)}
			{isCurrentlyLoading && (
				<div className={styles.loaderContainer}>
					<Loader type="TailSpin" color="#060930" height={100} width={100} />
				</div>
			)}
		</Layout>
	)
}

export default Search
