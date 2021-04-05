import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Book.module.scss'

const Book = ({ book, onClick, isBorrowed, role }) => (
	<div
		onKeyDown={undefined}
		tabIndex={-1}
		role="button"
		onClick={onClick}
		className={classnames(
			styles.oneBook,
			isBorrowed ? styles.borrowed : '',
			role === 'search' ? styles.search : '',
		)}
	>
		<div className={styles.cover}>
			<img alt={book.title} src={book.cover} />
			{isBorrowed && <p className={styles.borrowed}>borrowed</p>}
		</div>
		<div className={styles.meta}>
			<h1 className={styles.title}>{book.title}</h1>
			<p>{book.author}</p>
		</div>
	</div>
)

Book.defaultProps = {
	isBorrowed: false,
	onClick: () => {},
	role: 'home',
}

Book.propTypes = {
	book: PropTypes.shape({
		title: PropTypes.string,
		author: PropTypes.string,
		isbn: PropTypes.string,
		cover: PropTypes.string,
	}).isRequired,
	isBorrowed: PropTypes.bool,
	onClick: PropTypes.func,
	role: PropTypes.oneOf(['home', 'search']),
}

export default Book
