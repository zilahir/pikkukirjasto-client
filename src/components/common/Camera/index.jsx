import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'
import shortid from 'shortid'
import Loader from 'react-loader-spinner'

import styles from './Camera.module.scss'
import apiEndpoints from '../../../api/apiEndPoints'
import Button from '../Button'
import dataURIToBlob from '../../../utils/helpers/convertBaseToImage'

const Camera = ({ isOpen, isbn, handleClose }) => {
	const [isLoading, toggleLoading] = useState(false)
	const [isSuccess, toggleSuccess] = useState(false)
	const webcamReference = React.useRef(null)

	const capture = React.useCallback(() => {
		const imageSource = webcamReference.current.getScreenshot()
		toggleLoading(true)
		const imageFile = dataURIToBlob(imageSource)
		const formData = new FormData()
		const file = new File([imageFile], `${isbn}__${shortid.generate()}.jpg`, {
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
				toggleLoading(false)
				toggleSuccess(true)
			})
			.catch(() => {
				toggleLoading(false)
			})
	}, [webcamReference, isbn])

	return (
		isOpen && (
			<div className={styles.cameraContainer}>
				{!isLoading && !isSuccess && (
					<>
						<Webcam
							ref={webcamReference}
							screenshotFormat="image/jpeg"
							audio={false}
						/>
						<Button label="Take photo" onClick={capture} />
					</>
				)}

				{isLoading && (
					<div className={styles.loaderContainer}>
						<Loader type="TailSpin" color="#060930" height={100} width={100} />
					</div>
				)}

				{isSuccess && !isLoading && (
					<div className={styles.successContainer}>
						<h1>Thank you! Please leave the book in the shelf!</h1>
						<Button label="Got it" onClick={handleClose} />
					</div>
				)}
			</div>
		)
	)
}

Camera.defaultProps = {
	isOpen: false,
}

Camera.propTypes = {
	handleClose: PropTypes.func.isRequired,
	isbn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	isOpen: PropTypes.bool,
}

export default Camera
