const apiRoot = 'http://localhost:5000/api'

const apiEndpoints = {
	uploadImage: `${apiRoot}/file/upload`,
	getAllFiles: `${apiRoot}/book/files`,
	saveBook: `${apiRoot}/book/new`,
	getAllBooks: `${apiRoot}/book/all`,
}

export default apiEndpoints
