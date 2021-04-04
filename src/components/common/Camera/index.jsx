import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import shortid from 'shortid'

import styles from './Camera.module.scss'
import apiEndpoints from '../../../api/apiEndPoints'
import Button from '../Button'
import dataURIToBlob from '../../../utils/helpers/convertBaseToImage'

const Camera = ({ isOpen, isbn }) => {
	const webcamReference = React.useRef(null)

	const capture = React.useCallback(() => {
		const imageSource = webcamReference.current.getScreenshot()
		console.debug('imageSource', imageSource)
		const imageFile = dataURIToBlob(imageSource)
		const formData = new FormData()
		const file = new File([imageFile], `${isbn}-${shortid.generate()}.jpg`, {
			type: 'image/jpeg',
		})
		formData.append('image', file)
		axios
			.post(apiEndpoints.uploadImage, formData, {
				headers: {
					Accept: 'multipart/form-data',
				},
			})
			.then(() => {
				console.debug('done')
			})
	}, [webcamReference])

	return (
		isOpen && (
			<div className={styles.cameraContainer}>
				<Webcam
					ref={webcamReference}
					screenshotFormat="image/jpeg"
					audio={false}
				/>
				<Button label="Take photo" onClick={capture} />
			</div>
		)
	)
}

Camera.defaultProps = {
	isOpen: false,
}

Camera.propTypes = {
	isbn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	isOpen: PropTypes.bool,
}

export default Camera
