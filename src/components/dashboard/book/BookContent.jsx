import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getBook, deleteBook } from '../../../redux/actions/book'
import style from '../../../styles/dashboard/book.module.css'
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardText,
	Row,
	Col,
	Button,
} from 'reactstrap'
import BookModal from './BookModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'

const Content = (props) => {
	const [book, setBook] = useState(props.book.value)
	const [openModal, setOpen] = useState(false)
	const showModal = (e) => {
		e.preventDefault()
		setOpen(true)
	}

	const setModal = (param) => {
		setOpen(param)
	}

	const handleDelete = (param) => {
		console.log(param)
		console.log(props)
		swal({
			title: 'Are you sure?',
			text:
				'Once deleted, you will not be able to recover this imaginary file!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const token = props.auth.data.token
				props
					.deleteBook(token, param)
					.then((res) => {
						swal(`Data id ${param} has been deleted!`, {
							icon: 'success',
						})
						// props.data.push('/dashboard')
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

	useEffect(() => {
		// props.getBook(props.auth.data.token)
	}, [])
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
												// handleEdit(data.id)
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
			<BookModal open={openModal} setModal={setModal} data={props.data.push} />
		</div>
	)
}

const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	auth: state.auth,
})

const mapDispatchToProps = { getBook, deleteBook }
export default connect(mapStateTopProps, mapDispatchToProps)(Content)
