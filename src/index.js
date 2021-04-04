/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ClientContextProvider } from 'react-fetching-library'

import './index.css'
import App from './app'
import reportWebVitals from './reportWebVitals'
import client from './api/client'

ReactDOM.render(
	<React.StrictMode>
		<ClientContextProvider client={client}>
			<Router>
				<App />
			</Router>
		</ClientContextProvider>
	</React.StrictMode>,
	document.querySelector('#root'),
)

reportWebVitals()
