import React from 'react'
import PropTypes from 'prop-types'

import styles from './Book.module.scss'

const Book = ({ book }) => (
	<div className={styles.oneBook}>
		<div className={styles.cover}>
			<img alt={book.title} src={book.cover} />
		</div>
		<div className={styles.meta}>
			<h1 className={styles.title}>{book.title}</h1>
			<p>{book.author}</p>
		</div>
	</div>
)

Book.propTypes = {
	book: PropTypes.shape({
		title: PropTypes.string,
		author: PropTypes.string,
		isbn: PropTypes.string,
		cover: PropTypes.string,
	}).isRequired,
}

export default Book
