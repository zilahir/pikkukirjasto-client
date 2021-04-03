/* eslint-disable no-unused-vars */
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import BottomBar from './components/common/BottomBar'
import Borrow from './components/screens/Auth/Borrow'
import Home from './components/screens/Auth/Home'
import Insert from './components/screens/Auth/Insert'

import OnBoad from './components/screens/OnBoard'

/**
 *
 * @returns {HTMLElement} The root of the applications
 *
 */
function App() {
	const location = useLocation()
	return (
		<AnimatePresence>
			<Switch location={location} key={location.pathname}>
				<Route exact path="/onboard" component={OnBoad} />
				<Route exact path="/" component={Home} />
				<Route exact path="/borrow" component={Borrow} />
				<Route exact path="/add" component={Insert} />
			</Switch>
			<BottomBar />
		</AnimatePresence>
	)
}

export default App
