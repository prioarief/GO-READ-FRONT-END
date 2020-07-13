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
	insertAuthor,
	getAuthor,
	editAuthor,
} from '../../../redux/actions/author'
import swal from 'sweetalert'
// require('dotenv').config()

const AuthorModal = (props) => {
	const [modal, setOpenModal] = useState(props.open)
	const [id, setId] = useState(props.param)
	const [Author, setAuthor] = useState({
		id: props.author.detail[0].id,
		author: props.author.detail[0].author,
	})
	// console.log(process.env.REACT_APP_API_URL)

	const toggle = () => {
		props.setModal(!modal)
		setOpenModal(!modal)
		setAuthor({ ...Author, author: '', id: '' })
	}

	const handleCreate = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const data = {
			author: Author.author,
		}
		props.dispatch(insertAuthor(token, data)).then(() => {
			setOpen(!props.open)
			swal('Good job!', 'Data Successfully Added!', 'success')
			props.dispatch(getAuthor(token))
			// window.location.reload('/dashboard')
			// props.data('/dashboard')
		})
	}

	const handleEdit = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const data = {
			// id: Author.id,
			author: Author.author,
		}
		props
			.dispatch(editAuthor(token, Author.id, data))
			.then(() => {
				setOpen(!props.open)
				swal('Good job!', 'Data Successfully Edited!', 'success')
				props.dispatch(getAuthor(token))
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
		setAuthor({
			...Author,
			author: props.author.detail[0].author,
			id: props.author.detail[0].id,
		})
		// return () => {
		// }
	}, [props.author.detail[0].author])

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={'className'}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{props.titleModal || 'ADD AUTHOR'}
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={props.titleModal ? handleEdit : handleCreate}>
						<FormGroup>
							<Label for='author'>Author</Label>
							<Input
								autoFocus
								type='text'
								name='author'
								id='author'
								placeholder='Author Name'
								value={Author.author}
								onChange={(e) =>
									setAuthor({ ...Author, author: e.target.value })
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
	author: state.author,
})

// const mapDispatchToProps = { insertAuthor, getAuthor }
export default connect(mapStateTopProps)(AuthorModal)
