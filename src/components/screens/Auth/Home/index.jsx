/* eslint-disable no-unused-vars */
/* eslint-disable unicorn/consistent-function-scoping */
import React, { useEffect, useState } from 'react'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import { useQuery } from 'react-fetching-library'
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined'

import axios from 'axios'
import { useSnackbar } from 'react-simple-snackbar'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router'
import Book from '../../../common/Book'
import Header from '../../../common/Header'
import Layout from '../../../common/Layout'
import styles from './Home.module.scss'
import Modal from '../../../common/Modal'

import HomeContext from './context/homeContect'
import apiEndpoints from '../../../../api/apiEndPoints'
import Button from '../../../common/Button'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'
import { t } from '../../../../utils/i18n/i18n'

const fetchBookList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const Home = () => {
	const { loading, payload } = useQuery(fetchBookList)
	const [isBorrowingModalVisible, toggleBorrowingModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState()
	const [borrowHistory, setBorrowHistory] = useState([])
	const [openSnackbar] = useSnackbar({
		style: {
			width: '100%',
			backgroundColor: 'green',
			height: '5vh',
		},
	})
	const history = useHistory()

	const isBorrowed = isbn =>
		borrowHistory.some(
			borrow => cleanIsbn(borrow.isbn) === isbn && borrow.isBorrowed === true,
		)

	/**
	 * @param chosenBook
	 */
	function handleClick(chosenBook) {
		const isCurrentlyBorrowed = isBorrowed(chosenBook.isbn)
		if (!isCurrentlyBorrowed) {
			toggleBorrowingModal(currentlyVisible => !currentlyVisible)
			setSelectedBook(chosenBook)
		}
	}

	useEffect(() => {
		axios.get(apiEndpoints.getBorrowHistory).then(result => {
			setBorrowHistory(result.data)
		})
	}, [])

	/**
	 *
	 */
	function handleBorrow() {
		axios
			.post(apiEndpoints.createNewBorrow, {
				isbn: cleanIsbn(selectedBook.isbn),
			})
			.then(() => {
				toggleBorrowingModal(false)
				openSnackbar('You have borrowed this book', 3000)
			})
	}

	/**
	 *
	 */
	function viewAllBooks() {
		history.push('/search')
	}

	return (
		<>
			<HomeContext.Provider
				value={{
					setSelectedBook,
					selectedBook,
				}}
			>
				<Layout>
					<Header />
					<div className={styles.bookContainer}>
						<div className={styles.header}>
							<h1>{t('screens.home.avaliable-books')}</h1>{' '}
							<button
								type="button"
								onClick={() => viewAllBooks()}
								className={styles.viewAll}
							>
								{t('screens.home.search')}
							</button>
						</div>
						{!loading && (
							<Carousel
								offset={10}
								itemWidth={200}
								plugins={[
									{
										resolve: slidesToShowPlugin,
										options: {
											numberOfSlides: 3,
										},
									},
								]}
							>
								{payload.map(currentBook => (
									<Book
										onClick={() => handleClick(currentBook)}
										key={currentBook.key}
										isBorrowed={isBorrowed(cleanIsbn(currentBook.isbn))}
										book={{
											title: currentBook.title,
											author: currentBook.author,
											isbn: cleanIsbn(currentBook.isbn),
											cover: currentBook.cover,
										}}
									/>
								))}
							</Carousel>
						)}
						{loading && (
							<div className={styles.loaderContainer}>
								<Loader
									type="TailSpin"
									color="#060930"
									height={100}
									width={100}
								/>
							</div>
						)}
					</div>
				</Layout>
				<Modal
					handleClose={() => toggleBorrowingModal(false)}
					isVisible={isBorrowingModalVisible}
					innerContainer={styles.modalInner}
					height="40vh"
				>
					{isBorrowingModalVisible && (
						<>
							<div className={styles.borrowingModal}>
								<h1 className={styles.modalTitle}>Are you sure?</h1>
								<p className={styles.subTitle}>
									{t('misc.to-borrow-info')} <span>{selectedBook.title}</span>
								</p>
								<div className={styles.metaContainer}>
									<p className={styles.meta}>
										<WarningOutlinedIcon htmlColor="#060930" />{' '}
										{t('misc.to-borrow-btn')}
									</p>
								</div>
							</div>
							<Button
								label={t('buttons.borrow')}
								onClick={() => handleBorrow()}
							/>
						</>
					)}
				</Modal>
			</HomeContext.Provider>
		</>
	)
}

export default Home
