import React from 'react'
import style from '../styles/book.module.css'
import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'

const pagination = () => {
	return (
		<Container>
			<Pagination aria-label='Page navigation example' className={style.pagination}>
				<PaginationItem disabled>
					<PaginationLink first href='#' />
				</PaginationItem>
				<PaginationItem disabled>
					<PaginationLink previous href='#' />
				</PaginationItem>
				<PaginationItem active>
					<PaginationLink href='#'>1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='#'>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink next href='#' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink last href='#' />
				</PaginationItem>
			</Pagination>
		</Container>
	)
}

export default pagination
