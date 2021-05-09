import React, { useState } from 'react'

import styles from './Login.module.scss'

const Login = () => {
	const [password, setPassword] = useState()

	/**
	 *
	 */
	function handleLogin() {
		console.debug('password', password)
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
