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
} from 'reactstrap'
import { connect } from 'react-redux'
import {
	insertGenre,
	getGenre,
	// editGenre,
} from '../../../redux/actions/genre'
import swal from 'sweetalert'
// require('dotenv').config()

const GenreModal = (props) => {
	const [modal, setOpenModal] = useState(props.open)
	const [id, setId] = useState(props.param)
	const [Genre, setGenre] = useState({
		id: props.genre.detail[0].id,
		genre: props.genre.detail[0].genre,
	})
	// console.log(props)

	const toggle = () => {
		props.setModal(!modal)
		setOpenModal(!modal)
		setGenre({ ...Genre, genre: '', id: '' })
	}

	const handleCreate = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const data = {
			genre: Genre.genre,
		}
		props.dispatch(insertGenre(token, data)).then(() => {
			setOpen(!props.open)
			swal('Good job!', 'Data Successfully Added!', 'success')
			props.dispatch(getGenre(token))
			// window.location.reload('/dashboard')
			// props.data('/dashboard')
		})
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const data = {
			// id: Author.id,
			genre: Genre.genre,
		}
		// props
		// 	.dispatch(editAuthor(token, Author.id, data))
		// 	.then(() => {
		// 		setOpen(!props.open)
		// 		swal('Good job!', 'Data Successfully Edited!', 'success')
		// 		props.dispatch(getAuthor(token))
		// 	})
		// 	.catch((err) => {
		// 		console.log(err)
		// 	})
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
		setGenre({
			...Genre,
			genre: props.genre.detail[0].genre,
			id: props.genre.detail[0].id,
		})
		// return () => {
		// }
	}, [props.genre.detail[0].genre])

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={'className'}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{props.titleModal || 'ADD GENRE'}
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={props.titleModal ? handleEdit : handleCreate}>
						<FormGroup>
							<Label for='genre'>Genre</Label>
							<Input
								autoFocus
								type='text'
								name='genre'
								id='genre'
								placeholder='Genre'
								value={Genre.genre}
								onChange={(e) =>
									setGenre({ ...Genre, genre: e.target.value })
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
	// book: state.book,
	// genre: state.genre,
	auth: state.auth,
	genre: state.genre,
})

// const mapDispatchToProps = { insertAuthor, getAuthor }
export default connect(mapStateTopProps)(GenreModal)
