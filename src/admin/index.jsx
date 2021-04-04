/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useQuery } from 'react-fetching-library'
import apiEndpoints from '../api/apiEndPoints'
import EditModal from './components/EditModal'
import AdminContext from './context/adminContext'

const fetchFileList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllFiles,
}

const Admin = () => {
	const { loading, payload, error, query, reset, abort } = useQuery(
		fetchFileList,
	)
	const [isEditModalOpen, toggleEditModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState()

	/**
	 * @param book
	 */
	function selectBook(book) {
		toggleEditModal(true)
		setSelectedBook(book)
	}
	return (
		<>
			<AdminContext.Provider
				value={{
					selectedBook,
					setSelectedBook,
				}}
			>
				<table>
					<thead>
						<tr>
							<td>image</td>
							<td>isbn</td>
							<td>actions</td>
						</tr>
					</thead>
					<tbody>
						{!loading &&
							payload.map(file => (
								<tr key={file.isbn}>
									<td>
										<img alt="book" src={file.url} />
									</td>
									<td>{file.isbn}</td>
									<td>
										<button type="button" onClick={() => selectBook(file)}>
											EDIT
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<EditModal
					isVisible={isEditModalOpen}
					handleClose={() => toggleEditModal(false)}
				/>
			</AdminContext.Provider>
		</>
	)
}

export default Admin
