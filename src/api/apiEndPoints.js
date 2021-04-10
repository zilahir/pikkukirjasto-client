const apiRoot =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://aibch3zo5c.execute-api.eu-west-1.amazonaws.com/dev/api'

const apiEndpoints = {
	uploadImage: `${apiRoot}/file/upload`,
	getAllFiles: `${apiRoot}/book/files`,
	saveBook: `${apiRoot}/book/new`,
	getAllBooks: `${apiRoot}/book/all`,
	getBorrowHistory: `${apiRoot}/borrow/all`,
	createNewBorrow: `${apiRoot}/borrow/new`,
	returnBook: `${apiRoot}/borrow/return`,
	modifyBook: `${apiRoot}/book`,
}

export default apiEndpoints
