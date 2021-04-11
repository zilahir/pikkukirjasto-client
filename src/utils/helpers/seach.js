import cleanIsbn from './cleanIsbn'

/**
 * @param {string} givenSearchTerm the search term typed into the input
 * @param {Array} books the array of the books the search is perfmoed on
 * @param {string} searchLogic the seachlogic we are performing
 * @returns {Array} the filtered list of books,
 * performed on the providied aray of books, with the provided searcherm
 * and logic
 * @description filters the book by the provided searchterm
 * and sets the result into the array
 * that contains the filtered books
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
