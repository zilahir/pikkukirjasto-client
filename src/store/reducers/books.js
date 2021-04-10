import { SET_ALL_BOOK } from '../actions/actionTypes'

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
		default:
			return state
	}
}

export default reducer
