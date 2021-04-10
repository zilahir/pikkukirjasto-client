import { MODIFY_BOOK, SET_ALL_BOOK } from './actionTypes'

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
