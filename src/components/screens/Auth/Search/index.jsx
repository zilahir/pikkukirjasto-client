/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import classnames from 'classnames'
import { useQuery } from 'react-fetching-library'
import Loader from 'react-loader-spinner'
import { AnimateSharedLayout, motion } from 'framer-motion'
import apiEndpoints from '../../../../api/apiEndPoints'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'
import { t } from '../../../../utils/i18n/i18n'
import Book from '../../../common/Book'
import Button from '../../../common/Button'
import Layout from '../../../common/Layout'

import styles from './Search.module.scss'

const fetchBookList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const spring = {
	type: 'spring',
	stiffness: 500,
	damping: 30,
}

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, toggleLoading] = useState(false)
	const { loading, payload } = useQuery(fetchBookList)
	const [filteredBooks, setFilteredBooks] = useState([])
	const [searchLogic, setSearchLogic] = useState('title')

	const isCurrentlyLoading = isLoading || loading

	/**
	 * @param givenSearchTerm
	 */
	function handleSearch(givenSearchTerm) {
		setSearchTerm(givenSearchTerm)
		const filtered = payload.filter(book =>
			book.title.toLowerCase().includes(givenSearchTerm.toLowerCase()),
		)
		if (filtered.length > 0) {
			setFilteredBooks(filtered)
		}
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
				<div className={styles.searchLogicContainer}>
					<AnimateSharedLayout>
						<div className={styles.logicBtnContainer}>
							<button
								className={classnames(
									styles.logicBtn,
									searchLogic === 'title' ? styles.active : '',
								)}
								type="button"
								onClick={() => setSearchLogic('title')}
							>
								Title
								{searchLogic === 'title' && (
									<motion.div
										layoutId="searchLogic"
										initial={false}
										animate={{ backgroundColor: '#060930' }}
										transition={spring}
									/>
								)}
							</button>
						</div>
						<div className={styles.logicBtnContainer}>
							<button
								className={classnames(
									styles.logicBtn,
									searchLogic === 'author' ? styles.active : '',
								)}
								type="button"
								onClick={() => setSearchLogic('author')}
							>
								Author
								{searchLogic === 'author' && (
									<motion.div
										initial={false}
										animate={{ backgroundColor: '#060930' }}
										transition={spring}
										layoutId="searchLogic"
									/>
								)}
							</button>
						</div>
					</AnimateSharedLayout>
				</div>
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
