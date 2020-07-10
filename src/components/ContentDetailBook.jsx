import React, { useState } from 'react'
import style from '../styles/book.module.css'
import moment from 'moment'
import {
	Button,
	ModalFooter,
	FormGroup,
	Label,
	Input,
	FormText,
	ModalHeader,
	ModalBody,
	Form,
	Modal,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faShoppingCart,
	faArrowLeft,
	faPenAlt,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios'
import { useEffect } from 'react'

const Content = (props) => {
	const disable = props.data.status === 'Borrowed' ? true : false
	const [isOpen, setIsOpen] = useState(false)
	const date = moment(props.data.created_at).format('MMMM Do YYYY')
	const closeModal = () => setModal(!modal)
	const [modal, setModal] = useState(false)
	const toggle = () => setIsOpen(!isOpen)
	const [bookData, setBookData] = useState({
		title: '',
		image: '',
		genre: null,
		author: null,
		description: '',
	})
	const closeBtn = (
		<button className='close' onClick={closeModal}>
			&times;
		</button>
	)
	const handleDelete = () => {
		swal({
			title: 'Are you sure?',
			text:
				'Once deleted, you will not be able to recover this imaginary file!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				const token = localStorage.getItem('token')
				Axios({
					method: 'DELETE',
					url: `http://localhost:3000/api/books/${props.data.id}`,
					headers: {
						Authorization: token,
					},
				})
					.then((res) => {
						swal(`Data id ${props.data.id} has been deleted!`, {
							icon: 'success',
						})
						props.data_red.push('/books')
					})
					.catch((err) => {
						swal('Poof! Your imaginary file has been deleted!', {
							icon: 'error',
						})
						props.data_red.push('/books')
					})
			} else {
				swal('Your imaginary file is safe!')
			}
		})
	}

	const handleBorrow = () => {
		const token = localStorage.getItem('token')
		Axios({
			method: 'GET',
			url: `http://localhost:3000/api/transaction/borrow/${props.data.id}`,
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				swal(`Book ${props.data.title} has been borrowed!`, {
					icon: 'success',
				})
				props.data_red.push('/books')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const token = localStorage.getItem('RefreshToken')
		const formData = new FormData()
		formData.append('title', bookData.title)
		formData.append('description', bookData.description)
		formData.append('image', bookData.image[0])
		formData.append('genre_id', bookData.genre)
		formData.append('author_id', bookData.author)
		formData.append('status', 'Available')
		Axios({
			method: 'PUT',
			url: `http://localhost:3000/api/books/${props.data.id}`,
			data: formData,
			headers: {
				Authorization: token,
				'Content-Type': 'multipart/form-data',
			},
		})
			.then((res) => {
				swal('Good job!', 'Data Succesfull Edited!', 'success')
				props.data_red.push('/books')
			})
			.catch((err) => {
				console.log(err.response.data.data)
				swal('Ooopss!', `${err.response.data.data}`, 'error')
			})
	}

	// useEffect(() => {
	// 	setBookData({ title: props.data.title })
	// }, [])
	return (
		<div>
			<Link to='/' className={style.back}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
			{localStorage.getItem('role') === 'Admin' && (
				<span className={style.edit} onClick={closeModal}>
					<FontAwesomeIcon icon={faPenAlt} /> Edit
				</span>
			)}
			{localStorage.getItem('role') === 'Admin' && (
				<span className={style.delete} onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrashAlt} /> Delete
				</span>
			)}

			<span className={style.category}>{props.data.genre}</span>
			<span className={style.title}>{props.data.title}</span>
			<span className={style.date}>{date}</span>
			<span className={style.status}>{props.data.status}</span>
			<span className={`${style.description}`}>{props.data.description}</span>
			<Button className={style.btn_borrow} disabled={disable}>
				<span
					to={`/borrow/${props.data.id}`}
					className={`text-decoration-none text-white`}
					onClick={handleBorrow}
				>
					<FontAwesomeIcon icon={faShoppingCart} /> Borrow
				</span>
			</Button>

			<Modal
				isOpen={modal}
				toggle={toggle}
				centered
				className={style.modal_add}
			>
				<ModalHeader toggle={toggle} close={closeBtn}>
					EDIT {props.data.title}
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleEdit}>
						<FormGroup>
							<Label for='title'>Title</Label>
							<Input
								type='text'
								name='title'
								id='title'
								placeholder='Book Title'
								value={bookData.title}
								className={style.input_title}
								onChange={(e) =>
									setBookData({ ...bookData, title: e.target.value })
								}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='image'>Image</Label>
							<Input
								type='file'
								name='file'
								id='image'
								onChange={(e) =>
									setBookData({ ...bookData, image: e.target.files })
								}
							/>
							<FormText color='muted'>Just Support jpeg/jpg/png type</FormText>
						</FormGroup>
						<FormGroup>
							<Label for='author'>Author</Label>
							<Input
								type='select'
								name='author'
								id='author'
								onChange={(e) =>
									setBookData({ ...bookData, author: e.target.value })
								}
							>
								{props.authors.map((author) => {
									return (
										<option key={author.id} value={author.id}>
											{author.author}
										</option>
									)
								})}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for='genre'>Genre</Label>
							<Input
								type='select'
								name='genre'
								id='genre'
								onChange={(e) =>
									setBookData({ ...bookData, genre: e.target.value })
								}
							>
								{/* <option key={props.data.idGenre} value={props.data.idGenre} selected={true}>
											{props.data.genre}
										</option> */}
								{props.genres.map((genre) => {
									const setSelected =
										props.data.idGenre === genre.id ? true : false
									return (
										<option
											key={genre.id}
											value={genre.id}
											defaultValue={genre.id}
											selected={setSelected}
										>
											{genre.genre}
										</option>
									)
								})}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for='desc'>Description</Label>
							<Input
								type='textarea'
								name='text'
								id='desc'
								value={bookData.description}
								onChange={(e) =>
									setBookData({ ...bookData, description: e.target.value })
								}
							/>
						</FormGroup>
						<Button color='primary'>Edit</Button>{' '}
					</Form>
				</ModalBody>
			</Modal>
		</div>
	)
}

export default Content
