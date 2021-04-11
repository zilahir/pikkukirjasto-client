/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ClientContextProvider } from 'react-fetching-library'
import SnackbarProvider from 'react-simple-snackbar'
import { Provider } from 'react-redux'

import './index.css'
import App from './app'
import reportWebVitals from './reportWebVitals'
import client from './api/client'
import configureStore from './store/confiigureStore'

const store = configureStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ClientContextProvider client={client}>
				<SnackbarProvider>
					<Router>
						<App />
					</Router>
				</SnackbarProvider>
			</ClientContextProvider>
		</Provider>
	</React.StrictMode>,
	document.querySelector('#root'),
)

reportWebVitals()
