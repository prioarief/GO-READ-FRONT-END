import React from 'react'
import style from '../styles/book.module.css'
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Container,
	Row,
	Col,
} from 'reactstrap'
import { Link } from 'react-router-dom'

const ListBook = (props) => {
	// console.log(props)

	return (
		<div>
			<Container>
				<Row>
					{props.data.map((book) => {
						return (
							<Col md='4'>
								<Card className={style.card}>
									<CardImg
										top
										width='100%'
										src={`http://localhost:3000/images/${book.image}`}
										alt='Card image cap'
										className={style.card_img}
									/>
									<CardBody>
										<Link
											className={`text-decoration-none`}
											to={`/detail/${book.id}`}
											// to={`/detail/${book.title
											// 	.toLowerCase()
											// 	.split(' ')
											// 	.join('-')}`}
										>
											<CardTitle className={style.book_title}>
												{book.title}
											</CardTitle>
										</Link>
										{/* <CardSubtitle>Card subtitle</CardSubtitle> */}
										<CardText>
											{book.description.length > 200
												? `${book.description
														.split(' ')
														.join(' ')
														.slice(0, 200)}......`
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
				</Row>
			</Container>
		</div>
	)
}

export default ListBook
