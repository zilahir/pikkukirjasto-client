import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { authAdmin } from '../../../store/actions/admin'

import styles from './Login.module.scss'

const Login = () => {
	const [password, setPassword] = useState()
	const history = useHistory()
	const dispatch = useDispatch()

	/**
	 *
	 */
	function handleLogin() {
		if (password === process.env.REACT_APP_ADMIN_PASS) {
			dispatch(authAdmin(true))
			history.push('/admin')
		} else {
			alert('password is incorrect')
		}
	}
	return (
		<div className={styles.loginContainer}>
			<input
				type="password"
				onChange={event => setPassword(event.target.value)}
			/>
			<button onClick={() => handleLogin()} type="submit">
				login
			</button>
		</div>
	)
}

export default Login
