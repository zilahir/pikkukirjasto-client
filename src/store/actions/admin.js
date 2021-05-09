import { AUTH_ADMIN } from './actionTypes'

export const authAdmin = isAdmin => ({
	type: AUTH_ADMIN,
	payload: {
		isAdmin,
	},
})

export const removeadmin = () => ({
	type: AUTH_ADMIN,
	payload: {
		isAdmin: false,
	},
})
