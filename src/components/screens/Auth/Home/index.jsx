import React, { useState } from 'react'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import 'carbon-components/css/carbon-components.min.css'
import { Button } from 'carbon-components-react'

import Book from '../../../common/Book'
import Header from '../../../common/Header'
import Layout from '../../../common/Layout'
import styles from './Home.module.scss'
import { oneBook } from '../../../../api/book/book'
import Modal from '../../../common/Modal'

import HomeContext from './context/homeContect'

const Home = () => {
	const books = Array.from({ length: 10 })
		.fill()
		.map((_, index) => ({
			...oneBook,
			key: index,
		}))

	const [isBorrowingModalVisible, toggleBorrowingModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState()

	/**
	 * @param chosenBook
	 */
	function handleClick(chosenBook) {
		toggleBorrowingModal(currentlyVisible => !currentlyVisible)
		setSelectedBook(chosenBook)
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
							{books.map(currentBook => (
								<Book
									onClick={() => handleClick(currentBook)}
									key={currentBook.key}
									book={{
										title: currentBook.title,
										author: currentBook.author,
										isbn: currentBook.isbn,
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
										To borrow this book press the button below
									</p>
								</div>
							</div>
							<Button>Borrow</Button>
						</>
					)}
				</Modal>
			</HomeContext.Provider>
		</>
	)
}

export default Home
