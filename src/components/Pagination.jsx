import React, { useEffect } from 'react'
import { useQueryState } from 'react-router-use-location-state'
import style from '../styles/book.module.css'
import {
	Container,
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap'
import { connect } from 'react-redux'

const PaginationComponent = (props) => {
	const [thisPage, setThisPage] = useQueryState('page', 1)
	let dataLength = props.book.count
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
		props.qparams(null, thisPage)
	}, [pageActive])

	console.log(dataLength)
	return (
		<Container>
			<Pagination
				aria-label='Page navigation example'
				className={style.pagination}
			>
				{thisPage !== 1 && (
					<PaginationItem>
						<PaginationLink
							previous
							onClick={(e) => {
								e.preventDefault()
								setThisPage(thisPage - 1)
							}}
						/>
					</PaginationItem>
				)}
				{number.map((v, i) => {
					return (
						<PaginationItem active={thisPage === v ? true : false} key={i}>
							<PaginationLink
								onClick={(e) => {
									e.preventDefault()
									setThisPage(v)
								}}
							>
								{v}
							</PaginationLink>
						</PaginationItem>
					)
				})}
				{thisPage < totalPage && (
					<PaginationItem>
						<PaginationLink
							next
							onClick={(e) => {
								e.preventDefault()
								setThisPage(thisPage + 1)
							}}
						/>
					</PaginationItem>
				)}
			</Pagination>
		</Container>
	)
}

const mapStateToProps = (state) => ({
	// auth: state.auth,
	book: state.book,
})

// const mapDispatchToProps

export default connect(mapStateToProps)(PaginationComponent)
