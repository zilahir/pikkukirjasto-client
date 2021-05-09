import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import books from './reducers/books'
import admin from './reducers/admin'

const rootReducer = combineReducers({
	books,
	admin,
})

// eslint-disable-next-line no-underscore-dangle
const middleWareList = [thunk]
if (process.env.NODE_ENV === 'development') {
	middleWareList.push(logger)
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () =>
	createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default configureStore
