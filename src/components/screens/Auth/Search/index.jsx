/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useQuery } from 'react-fetching-library'
import Loader from 'react-loader-spinner'
import apiEndpoints from '../../../../api/apiEndPoints'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'
import { t } from '../../../../utils/i18n/i18n'
import Book from '../../../common/Book'
import Layout from '../../../common/Layout'

import styles from './Search.module.scss'

const fetchBookList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { loading, payload } = useQuery(fetchBookList)

	/**
	 * @param givenSearchTerm
	 */
	function handleSearch(givenSearchTerm) {
		setSearchTerm(givenSearchTerm)
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
			</div>
			{!loading && (
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
			{loading && (
				<div className={styles.loaderContainer}>
					<Loader type="TailSpin" color="#060930" height={100} width={100} />
				</div>
			)}
		</Layout>
	)
}

export default Search
