import React from 'react';
import style from '../styles/book.module.css';
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
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';

class ListBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: props.book.value || null,
			length: props.book.value.value
		};
	}

	render() {
		const {books, length} = this.state
		return (
			<div>
				<Container>
					{length === 14 && (
						<Alert color='danger' className='mt-5'>
							Data not found!
						</Alert>
					)}
					<Row>
						{length !== 14 &&
							books.map((book) => {
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
								);
							})}
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
});

// const mapDispatchToProps

export default connect(mapStateToProps)(ListBook);
