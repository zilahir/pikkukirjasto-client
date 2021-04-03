/* eslint-disable no-unused-vars */
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import BottomBar from './components/common/BottomBar'
import Home from './components/screens/Auth/Home'

import OnBoad from './components/screens/OnBoard'

/**
 *
 * @returns {HTMLElement} The root of the applications
 *
 */
function App() {
	const location = useLocation()
	return (
		<>
			<Switch>
				<Route exact path="/onboard" component={OnBoad} />
				<Route exact path="/" component={Home} />
			</Switch>
			<BottomBar />
		</>
	)
}

export default App
