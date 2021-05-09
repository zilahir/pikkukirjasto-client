const { AUTH_ADMIN } = require('../actions/actionTypes')

const initialState = {
	isAdmin: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_ADMIN:
			return {
				...state,
				isAdmin: action.payload.isAdmin,
			}
		default:
			return state
	}
}

export default reducer
