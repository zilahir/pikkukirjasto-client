import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-fetching-library'
import StackGrid from 'react-stack-grid'
import apiEndpoints from '../../../../../api/apiEndPoints'
import cleanIsbn from '../../../../../utils/helpers/cleanIsbn'
import Book from '../../../../common/Book'

const fetchBookList = {
	method: 'GET',
	endpoint: apiEndpoints.getAllBooks,
}

const DesktopHome = () => {
	const { loading, payload } = useQuery(fetchBookList)
	const [borrowHistory, setBorrowHistory] = useState([])

	const isBorrowed = isbn =>
		borrowHistory.some(
			borrow => cleanIsbn(borrow.isbn) === isbn && borrow.isBorrowed === true,
		)

	useEffect(() => {
		axios.get(apiEndpoints.getBorrowHistory).then(result => {
			setBorrowHistory(result.data)
		})
	}, [])
	return (
		<div>
			{!loading && (
				<StackGrid columnWidth={350}>
					{payload.map(currentBook => (
						<Book
							key={currentBook.key}
							isBorrowed={isBorrowed(cleanIsbn(currentBook.isbn))}
							book={{
								title: currentBook.title,
								author: currentBook.author,
								isbn: cleanIsbn(currentBook.isbn),
								cover: currentBook.cover,
							}}
						/>
					))}
				</StackGrid>
			)}
		</div>
	)
}

export default DesktopHome
