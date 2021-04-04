import React from 'react'
import { ToastContainer } from 'react-toastify'

const Notification = () => (
	<ToastContainer
		position="bottom-center"
		autoClose={false}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnVisibilityChange
		draggable={false}
		pauseOnHover={false}
	/>
)

export default Notification
