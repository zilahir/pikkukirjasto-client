import cleanIsbn from './cleanIsbn'

/**
 * @param givenSearchTerm
 * @param books
 * @param searchLogic
 */
function searchBooks(givenSearchTerm, books, searchLogic) {
	let filtered = []
	if (searchLogic === 'title') {
		filtered = books.filter(book =>
			book.title.toLowerCase().includes(givenSearchTerm.toLowerCase()),
		)
	} else if (searchLogic === 'author') {
		filtered = books.filter(book =>
			book.author.toLowerCase().includes(givenSearchTerm.toLowerCase()),
		)
	} else if (searchLogic === 'isbn') {
		filtered = books.filter(book =>
			cleanIsbn(book.isbn).includes(cleanIsbn(givenSearchTerm)),
		)
	}
	return filtered
}

export default searchBooks
