/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'

/**
 * @param root0
 * @param root0.children
 */
function PrivateRoute({ children, ...rest }) {
	const { isAdmin } = useSelector(state => state.admin)
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAdmin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
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
