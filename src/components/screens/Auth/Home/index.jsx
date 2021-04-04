import React, { useEffect, useState } from 'react'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import { useQuery } from 'react-fetching-library'
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined'

import axios from 'axios'
import { useSnackbar } from 'react-simple-snackbar'
import Book from '../../../common/Book'
import Header from '../../../common/Header'
import Layout from '../../../common/Layout'
import styles from './Home.module.scss'
import Modal from '../../../common/Modal'

import HomeContext from './context/homeContect'
import apiEndpoints from '../../../../api/apiEndPoints'
import Button from '../../../common/Button'
import cleanIsbn from '../../../../utils/helpers/cleanIsbn'

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
						<h1>Avaliable books</h1>
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
							{!loading &&
								payload.map(currentBook => (
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
									You are about to borrow <span>{selectedBook.title}</span>
								</p>
								<div className={styles.metaContainer}>
									<p className={styles.meta}>
										<WarningOutlinedIcon htmlColor="#060930" /> To borrow this
										book press the button below
									</p>
								</div>
							</div>
							<Button label="Borrow" onClick={() => handleBorrow()} />
						</>
					)}
				</Modal>
			</HomeContext.Provider>
		</>
	)
}

export default Home
