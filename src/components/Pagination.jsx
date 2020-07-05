import React, { useEffect } from 'react'
import { useQueryState } from 'react-router-use-location-state'
import style from '../styles/book.module.css'
import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'

const PaginationComponent = (props) => {
	const [thisPage, setThisPage] = useQueryState('page', 0)
	let dataLength = props.data 
	let show = props.show === null ? 6 : props.show
	let pageActive = props.show === null ? 1 : props.page
	let totalPage = Math.ceil(dataLength / show)
	let number = []
	// console.log(totalPage)
	// console.log(props.qparams)


	// // setThistotalPage(1)
	for (let i = 1; i <= totalPage; i++) {
		number.push(i)
		}
		
		useEffect(() => {
			props.qparams(null ,thisPage)
		}, [pageActive])
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
							<PaginationItem active={(thisPage === v) ? true: false} key={i}>
								<PaginationLink onClick={((e) => {
									e.preventDefault()
									setThisPage(v)
								})}>{v}</PaginationLink>
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
