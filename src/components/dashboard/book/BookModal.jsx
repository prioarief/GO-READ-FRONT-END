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
import { insertBook, getBook } from '../../../redux/actions/book'

const BookModal = (props) => {
	const [modal, setOpenModal] = useState(props.open)
	const [bookData, setBookData] = useState({
		title: '',
		image: '',
		genre: null,
		author: null,
		description: '',
	})
	// console.log(props)

	const toggle = () => {
		props.setModal(!modal)
		setOpenModal(!modal)
	}

	const handleCreate = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const formData = new FormData()
		formData.append('title', bookData.title)
		formData.append('description', bookData.description)
		formData.append('image', bookData.image[0])
		formData.append('genre_id', bookData.genre)
		formData.append('author_id', bookData.author)
		formData.append('status', 'Available')

		props.insertBook(token, formData).then(() => {
			props.data('/dashboard')
			props.getBook(token)
			// props.setModal(!modal)
			// setOpenModal(!modal)
		})
	}

	const setOpen = (param) => {
		setOpenModal(param)
	}

	const closeBtn = (
		<button className='close' onClick={toggle}>
			&times;
		</button>
	)

	useEffect(() => {
		modal ? setOpen(!props.open) : setOpen(props.open)
	}, [props.open])

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} centered className={'className'}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					ADD BOOK
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleCreate}>
						<FormGroup>
							<Label for='title'>Title</Label>
							<Input
								type='text'
								name='title'
								id='title'
								placeholder='Book Title'
								className={'style'.input_title}
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
								<option selected={true} disabled={true}>
									Select Author
								</option>
								{props.author.value.map((author) => {
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
								<option selected={true} disabled={true}>
									Select Genre
								</option>
								{props.genre.value.map((genre) => {
									return (
										<option key={genre.id} value={genre.id}>
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
								onChange={(e) =>
									setBookData({ ...bookData, description: e.target.value })
								}
							/>
						</FormGroup>
						<Button color='primary' className={style.btn_create}>
							Create
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

const mapDispatchToProps = { insertBook,getBook }
export default connect(mapStateTopProps, mapDispatchToProps)(BookModal)
