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

const ListHistory = (props) => {
	const data = props.data.length
	return (
		<div>
			<Container>
					{data === 14 && (
						<Alert color='danger' className='mt-5'>Data not found!</Alert>
					)}
				<Row>
					{data !== 14 &&
						props.data.map((book) => {
							return (
								<Col md='4' key={book.id}>
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
												to={`/detail-history/${book.id}`} 
											>
												<CardTitle className={style.book_title}>
													{book.title}
												</CardTitle>
											</Link>
											<CardText>
												{book.description.length > 150
													? `${book.description
															.split(' ')
															.join(' ')
															.slice(0, 150)}......`
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

export default ListHistory
