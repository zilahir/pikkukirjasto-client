import React, { useState } from 'react'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import Book from '../../../common/Book'
import Header from '../../../common/Header'
import Layout from '../../../common/Layout'
import styles from './Home.module.scss'
import { oneBook } from '../../../../api/book/book'
import Modal from '../../../common/Modal'

const Home = () => {
	const books = Array.from({ length: 10 })
		.fill()
		.map((_, index) => ({
			...oneBook,
			key: index,
		}))

	const [isBorrowingModalVisible, toggleBorrowingModal] = useState(false)
	return (
		<>
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
						{books.map(({ title, key, author, isbn, cover }) => (
							<Book
								onClick={() =>
									toggleBorrowingModal(currentlyVisible => !currentlyVisible)
								}
								key={key}
								book={{
									title,
									author,
									isbn,
									cover,
								}}
							/>
						))}
					</Carousel>
				</div>
			</Layout>
			<Modal
				handleClose={() => toggleBorrowingModal(false)}
				isVisible={isBorrowingModalVisible}
			>
				<h1>lofasz</h1>
			</Modal>
		</>
	)
}

export default Home
