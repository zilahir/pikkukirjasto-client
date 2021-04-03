/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import shortid from 'shortid'

import apiEndpoints from '../../../api/apiEndPoints'

const UploadFile = () => {
	const onDrop = useCallback(acceptedFiles => {
		const isbn = 'lofsaz'
		const image = acceptedFiles[0]
		const formData = new FormData()
		const file = new File([image], `${isbn}-${shortid.generate()}.jpg`, {
			type: 'image/jpeg',
		})
		formData.append('image', file)
		axios.post(apiEndpoints.uploadImage, formData, {
			headers: {
				Accept: 'multipart/form-data',
			},
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
					Open File Dialog
				</button>
			</div>
		</div>
	)
}

export default UploadFile
