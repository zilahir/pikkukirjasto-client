/* eslint-disable no-unused-vars */
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import Admin from './admin'
import New from './admin/New'
import BottomBar from './components/common/BottomBar'
import Notification from './components/Notification'
import Borrow from './components/screens/Auth/Borrow'
import Home from './components/screens/Auth/Home'
import Insert from './components/screens/Auth/Insert'
import OnBoad from './components/screens/OnBoard'
import ReturnScreen from './components/screens/Auth/Return'
import Search from './components/screens/Auth/Search'

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
				<Route exact path="/admin" component={Admin} />
				<Route exact path="/new" component={New} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/return" component={ReturnScreen} />
			</Switch>
			{!location.pathname.includes('admin') &&
				!location.pathname.includes('new') &&
				isMobile && <BottomBar />}
		</AnimatePresence>
	)
}

export default App
