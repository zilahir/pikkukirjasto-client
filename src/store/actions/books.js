import { MODIFY_BOOK, REMOVE_BOOK, SET_ALL_BOOK } from './actionTypes'

export const setAllBooks = allBooks => ({
	type: SET_ALL_BOOK,
	payload: {
		allBooks,
	},
})

export const modifyBook = modifiedBook => ({
	type: MODIFY_BOOK,
	payload: {
		modifiedBook,
	},
})

export const removeBook = isbn => ({
	type: REMOVE_BOOK,
	payload: {
		isbn,
	},
})
