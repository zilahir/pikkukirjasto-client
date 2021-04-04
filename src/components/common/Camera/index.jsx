/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'

import styles from './Camera.module.scss'

const Camera = ({ isOpen }) => {
	const webcamReference = React.useRef(null)

	const capture = React.useCallback(() => {
		const imageSource = webcamReference.current.getScreenshot()
	}, [webcamReference])

	return (
		isOpen && (
			<div className={styles.cameraContainer}>
				<Webcam screenshotFormat="image/jpeg" audio={false} />
				<button onClick={capture} type="button">
					Take screenshot
				</button>
			</div>
		)
	)
}

Camera.defaultProps = {
	isOpen: false,
}

Camera.propTypes = {
	isOpen: PropTypes.bool,
}

export default Camera
