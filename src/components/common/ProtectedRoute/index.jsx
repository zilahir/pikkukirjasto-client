/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

/**
 * @param root0
 * @param root0.children
 */
function PrivateRoute({ children, ...rest }) {
	const auth = false
	console.debug('hello', auth)
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

PrivateRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]).isRequired,
}

export default PrivateRoute
