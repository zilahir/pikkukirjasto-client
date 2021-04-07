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
	}
	return filtered
}

export default searchBooks
