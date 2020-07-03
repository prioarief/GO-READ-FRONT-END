import React, { useEffect, useState } from 'react'
import { useQueryState } from 'react-router-use-location-state'
import style from '../styles/book.module.css'
import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'

const PaginationComponent = (props) => {
	// const [thisPage, setThisPage] = useQueryState('page', 1)
	let dataLength = props.data.length
	let show = props.show === null ? 6 : props.show
	// let pageActive = props.show === null ? 1 : props.page
	let totalPage = (dataLength / show)
	let number = []
	// console.log(dataLength)

	// // setThistotalPage(1)
	for (let i = 1; i <= totalPage; i++) {
		number.push(i)
		}
		// console.log(dataLength/show)
		// console.log(show)

		useEffect(() => {}, [dataLength])
		return (
			<Container>
				<Pagination
					aria-label='Page navigation example'
					className={style.pagination}
				>
					{/* <PaginationItem disabled>
					<PaginationLink first href='#' />
				</PaginationItem>
				<PaginationItem disabled>
					<PaginationLink previous href='#' />
				</PaginationItem> */}
					{number.map((v, i) => {
						return (
							<PaginationItem active={false} key={i}>
								<PaginationLink href='#'>{v}</PaginationLink>
							</PaginationItem>
						)
					})}
					{/* <PaginationItem active={false}>
					<PaginationLink href='#'>{page}</PaginationLink>
				</PaginationItem> */}
					{/* <PaginationItem>
					<PaginationLink next href='#' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink last href='#' />
				</PaginationItem> */}
				</Pagination>
			</Container>
		)
	}


export default PaginationComponent
