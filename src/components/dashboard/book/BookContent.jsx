import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	deleteBook,
	getBook,
	detailBook,
} from '../../../redux/actions/book'
import {getAuthor} from '../../../redux/actions/author'
import {getGenre} from '../../../redux/actions/genre'
import style from '../../../styles/dashboard/book.module.css'
import { Button, Table, Row, Col, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import BookModal from './BookModal'
import swal from 'sweetalert'

const BookContent = (props) => {
	const [book, setBook] = useState(props.book.value)
	const [id, setId] = useState(0)
	const [openModal, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const showModal = (e) => {
		e.preventDefault()
		setTitle('')
		setOpen(true)
	}

	const setModal = (param) => {
		setOpen(param)
	}

	

	const handleDelete = async (param) => {
		swal({
			title: 'Are you sure?',
			text:
				'Once deleted, you will not be able to recover this imaginary file!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(async(willDelete) => {
			if (willDelete) {
				const token = props.auth.data.token
				await props.dispatch(getAuthor(token))
				props
					.dispatch(deleteBook(token, param))
					.then(async (res) => {
						await props.dispatch(getGenre(token))
						await props.dispatch(getBook(token, props.book.count))
						swal(`Data id ${param} has been deleted!`, {
							icon: 'success',
						})
						setTimeout(() => {
							window.location.reload('/dashboard')
						}, 200);
					})
					.catch((err) => {
						swal('Poof! Your imaginary file has been deleted!', {
							icon: 'error',
						})
						console.log(err)
						// props.data.push('/dashboard')
					})
			} else {
				swal('Your imaginary file is safe!')
			}
		})
	}

	const handleEdit = (param) => {
		setId(param)
		setTitle('EDIT BOOK')
		setOpen(true)
		// props.getDetailAuthor(props.auth.data.token, param)
		// console.log(param)
		props.dispatch(detailBook(props.auth.data.token, param)).then(() => {
			props.dispatch(getAuthor(props.auth.data.token))
		})
	}
	// useEffect(() => {
	// 	props.dispatch(getBook(props.auth.data.token))
	// }, [props.book.value])
	return (
		<div>
			<h2 className={style.content_title}>Book Data({props.book.count})</h2>
			<Button color='info' className={style.btn_add} onClick={showModal}>
				Add Book
			</Button>
			<div className={style.content}>
				<Row className={style.container}>
					{book.map((data) => {
						return (
							<Col md='3' className={style.card_container} key={data.id}>
								<Card className={style.card}>
									<CardImg
										top
										width='100%'
										src={`http://localhost:3000/images/${data.image}`}
										alt='Card image cap'
										className={style.img}
									/>
									<CardBody>
										<CardTitle
											className='font-weight-bold'
											style={{ cursor: 'pointer' }}
										>
											{data.title}
										</CardTitle>
										<CardText className={style.desc}>
											{data.description.length > 50
												? `${data.description
														.split(' ')
														.join(' ')
														.slice(0, 50)}......`
												: `${data.description
														.split(' ')
														.join(' ')
														.slice(0, data.description.length)}`}
										</CardText>
										<Button
											color='primary'
											size='sm'
											className={`style.btn_add mr-2`}
											onClick={(e) => {
												e.preventDefault()
												handleEdit(data.id)
											}}
											title='Edit'
										>
											<FontAwesomeIcon icon={faPencilAlt} />
										</Button>
										<Button
											color='danger'
											size='sm'
											title='Delete'
											onClick={(e) => {
												e.preventDefault()
												handleDelete(data.id)
											}}
										>
											<FontAwesomeIcon icon={faTrashAlt} />
										</Button>
									</CardBody>
								</Card>
							</Col>
						)
					})}
				</Row>
			</div>
			<BookModal
				open={openModal}
				setModal={setModal}
				titleModal={title}
				data={props.data.push}
				param={id}
			/>
		</div>
	)
}

const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	author: state.author,
	auth: state.auth,
})

export default connect(mapStateTopProps)(BookContent)
