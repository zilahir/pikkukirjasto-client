import { AUTH_ADMIN } from './actionTypes'

export const authAdmin = isAdmin => ({
	type: AUTH_ADMIN,
	payload: {
		isAdmin,
	},
})

export const removeAdmin = () => ({
	type: AUTH_ADMIN,
	payload: {
		isAdmin: false,
	},
})
