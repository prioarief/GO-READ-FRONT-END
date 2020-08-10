import React, { useState, useEffect } from 'react'
import style from '../../../styles/dashboard/book.module.css'
import {
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	Input,
	FormGroup,
	Label,
	Form,
	FormText,
} from 'reactstrap'
import { connect } from 'react-redux'
import { insertBook, getBook, editBook } from '../../../redux/actions/book'
import { getAuthor } from '../../../redux/actions/author'
import { getGenre } from '../../../redux/actions/genre'
import swal from 'sweetalert'
// require('dotenv').config()

const AuthorModal = (props) => {
	const [modal, setOpenModal] = useState(props.open)
	const [id, setId] = useState(props.param)
	const [bookData, setBookData] = useState({
		title: '',
		image: '',
		genre: null,
		author: null,
		description: '',
		id: '',
	})
	// console.log(process.env.REACT_APP_API_URL)

	const toggle = () => {
		props.setModal(!modal)
		setOpenModal(!modal)
		setBookData({
			...bookData,
			title: '',
			id: '',
			image: '',
			genre: null,
			author: null,
			description: '',
		})
	}

	const handleCreate = async(e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const formData = new FormData()
		formData.append('title', bookData.title)
		formData.append('description', bookData.description)
		formData.append('image', bookData.image[0])
		formData.append('genre_id', 17)
		formData.append('author_id', 18)
		formData.append('status', 'Available')

		// console.log(bookData)
		await props.dispatch(insertBook(token, formData)).then(async (res) => {
			await props.dispatch(getAuthor(token))
			await props.dispatch(getGenre(token))
			await props.dispatch(getBook(token))
			setOpen(!props.open)
			swal('Good job!', 'Data Successfully Added!', 'success')
			setTimeout(() => {
				window.location.reload('/dashboard')
			}, 200);
			// props.data('/dashboard')
			// props.setModal(!modal)
		})
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const formData = new FormData()
		formData.append('title', bookData.title)
		formData.append('description', bookData.description)
		formData.append('image', bookData.image[0])
		// bookData.image[0] !== 1 ? formData.append('image', bookData.image[0] ) : formData.append('image', bookData.image )
		formData.append('genre_id', bookData.genre)
		formData.append('author_id', bookData.author)
		formData.append('status', 'Available')
		// console.log(bookData.image)
		// console.log(bookData.image[0])
		// const token = props.auth.data.token
		// const data = {
		// 	// id: Author.id,
		// 	author: Author.author,
		// }
		props
			.dispatch(editBook(token, bookData.id, formData))
			.then(() => {
				setOpen(!props.open)
				swal('Good job!', 'Data Successfully Edited!', 'success')
				props.dispatch(getBook(token))
				// setTimeout(() => {
				// 	window.location.reload('/dashboard')
				// }, 200);
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const setOpen = async (param) => {
		setOpenModal(param)
		setId(props.param)
		// props.dispatch(getDetailAuthor(props.auth.data.token,))

		// await setAuthor(props.author.detail[0].author)
		// getDetailAuthor(props.auth.data.token, props.param)
		// console.log(id)
	}

	const closeBtn = (
		<button className='close' onClick={toggle}>
			&times;
		</button>
	)

	useEffect(() => {
		modal ? setOpen(!props.open) : setOpen(props.open)
		// setAuthor(props.author.detail[0].author)
		// console.log(Author)
	}, [props.open])

	useEffect(() => {
		// getDetailAuthor(props.auth.data.token, 17)
		setBookData({
			...bookData,
			title: props.book.detail[0].title,
			description: props.book.detail[0].description,
			image: props.book.detail[0].image,
			author: props.book.detail[0].idAuthor,
			genre: props.book.detail[0].idGenre,
			id: props.author.detail[0].id,
		})
		// return () => {
		// }
	}, [props.book.detail[0].title])

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} centered className={'className'}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{props.titleModal || 'ADD BOOK'}
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={props.titleModal ? handleEdit : handleCreate}>
						<FormGroup>
							<Label for='title'>Title</Label>
							<Input
								type='text'
								name='title'
								id='title'
								placeholder='Book Title'
								value={bookData.title}
								className={'style'.input_title}
								onChange={(e) =>
									setBookData({ ...bookData, title: e.target.value })
								}
							/>
						</FormGroup>
						<FormGroup>
							{/* <img src={`http://localhost:3000/images/${bookData.image}`} alt="book" className='img-fluid'/> */}
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
								defaultValue={'DEFAULT'} 
								type='select'
								name='author'
								id='author'
								onChange={(e) =>
									setBookData({ ...bookData, author: e.target.value })
								}
							>
								<option selected={true} disabled={true} value={null}>
									Select Author
								</option>
								{/* {props.author.value.map((author) => {
									return (
										<option key={author.id} value={author.id}>
											{author.author}
										</option>
									)
								})} */}
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
								<option selected={true} disabled={true} value={null}>
									Select Genre
								</option>
								{/* {props.genre.value.map((genre) => {
									return (
										<option key={genre.id} value={genre.id}>
											{genre.genre}
										</option>
									)
								})} */}
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
						<Button color='primary' className={style.btn_create}>
							{props.titleModal ? 'Edit' : 'Create'}
						</Button>{' '}
					</Form>
				</ModalBody>
			</Modal>
		</div>
	)
}
const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	auth: state.auth,
	author: state.author,
})

// const mapDispatchToProps = { insertAuthor, getAuthor }
export default connect(mapStateTopProps)(AuthorModal)
