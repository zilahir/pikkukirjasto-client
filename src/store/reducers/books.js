import { REMOVE_BOOK, SET_ALL_BOOK } from '../actions/actionTypes'

const initialState = {
	allBooks: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_BOOK:
			return {
				...state,
				allBooks: action.payload.allBooks,
			}
		case REMOVE_BOOK: {
			const filtered = state.allBooks.filter(
				book => book.isbn !== action.payload.isbn,
			)
			return {
				...state,
				allBooks: filtered,
			}
		}
		default:
			return state
	}
}

export default reducer
