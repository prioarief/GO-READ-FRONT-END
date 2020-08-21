import React from 'react'
import style from '../styles/book.module.css'
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Container,
	Row,
	Col,
	Alert,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const ListBook = (props) => {
	// const [bookData] = useState(props.book.value)
	// console.log(props.book.value)
	// useEffect(() => {
	// 	props.book.value.map((a) => {
	// 		return setBookData
	// 	})
	// }, [])

	const data = props.book.value.length
	return (
		<div>
			<Container>
				{/* {data === 14 && (
					<Alert color='danger' className='mt-5'>
						Data not found!
					</Alert>
				)}
				<Row>
					{data !== 14 &&
						props.book.value.map((book) => {
							return (
								<Col md='4' key={book.id}>
									<Card className={style.card}>
										<CardImg
											top
											width='100%'
											src={`${process.env.REACT_APP_API_URL}/images/${book.image}`}
											alt={`${book.title} image`}
											className={style.card_img}
										/>
										<CardBody>
											<Link
												className={`text-decoration-none`}
												to={`/detail/${book.id}`}
											>
												<CardTitle className={style.book_title}>
													{book.title}
												</CardTitle>
											</Link>
											<CardText>
												{book.description.length > 120
													? `${book.description
															.split(' ')
															.join(' ')
															.slice(0, 120)}......`
													: `${book.description
															.split(' ')
															.join(' ')
															.slice(0, book.description.length)}`}
											</CardText>
										</CardBody>
									</Card>
								</Col>
							)
						})}
				</Row> */}
			</Container>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
})

// const mapDispatchToProps

export default connect(mapStateToProps)(ListBook)
