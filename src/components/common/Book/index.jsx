import React from 'react'
import PropTypes from 'prop-types'

import styles from './Book.module.scss'

const Book = ({ book, onClick }) => (
	<div
		onKeyDown={undefined}
		tabIndex={-1}
		role="button"
		onClick={onClick}
		className={styles.oneBook}
	>
		<div className={styles.cover}>
			<img alt={book.title} src={book.cover} />
		</div>
		<div className={styles.meta}>
			<h1 className={styles.title}>{book.title}</h1>
			<p>{book.author}</p>
		</div>
	</div>
)

Book.defaultProps = {
	onClick: () => {},
}

Book.propTypes = {
	book: PropTypes.shape({
		title: PropTypes.string,
		author: PropTypes.string,
		isbn: PropTypes.string,
		cover: PropTypes.string,
	}).isRequired,
	onClick: PropTypes.func,
}

export default Book
