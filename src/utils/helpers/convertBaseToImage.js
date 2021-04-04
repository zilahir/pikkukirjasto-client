/**
 * @param {string} dataURI the base64 image
 * @returns {Blob} blob the blob of the created file
 */
function dataURIToBlob(dataURI) {
	const splitDataURI = dataURI.split(',')
	const byteString = splitDataURI[0].includes('base64')
		? atob(splitDataURI[1])
		: decodeURI(splitDataURI[1])
	const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

	const ia = new Uint8Array(byteString.length)
	for (let index = 0; index < byteString.length; index += 1)
		ia[index] = byteString.charCodeAt(index)

	return new Blob([ia], { type: mimeString })
}

export default dataURIToBlob
