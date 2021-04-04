/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import shortid from 'shortid'

import apiEndpoints from '../../../api/apiEndPoints'

const UploadFile = ({ getBackUrl }) => {
	const onDrop = useCallback(acceptedFiles => {
		const isbn = 'lofsaz'
		const image = acceptedFiles[0]
		const formData = new FormData()
		const file = new File([image], `${isbn}__${shortid.generate()}.jpg`, {
			type: 'image/jpeg',
		})
		formData.append('image', file)
		axios
			.post(apiEndpoints.uploadImage, formData, {
				headers: {
					Accept: 'multipart/form-data',
				},
			})
			.then(result => {
				getBackUrl(result.data)
			})
	}, [])
	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
	})

	return (
		<div className="container">
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<button type="button" onClick={open}>
					upload book cover
				</button>
			</div>
		</div>
	)
}

UploadFile.propTypes = {
	getBackUrl: PropTypes.func.isRequired,
}

export default UploadFile
