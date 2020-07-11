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
import { insertGenre, getGenre } from '../../../redux/actions/genre'

const GenreModal = (props) => {
	const [modal, setOpenModal] = useState(props.open)
	// const [id, setId] = useState(props.param)
	const [Genre, setGenre] = useState({
		name: '',
	})
	console.log(props)

	const toggle = () => {
		props.setModal(!modal)
		setOpenModal(!modal)
	}

	const handleCreate = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const data = {
			genre : Genre.name
		}
		props.insertGenre(token, data).then(() => {
			props.data('/dashboard')
			props.getGenre(token)
		})
	}

	const setOpen = (param) => {
		setOpenModal(param)
		// setId(props.param)
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
	}, [props.open])


	return (
		<div>
		
			<Modal isOpen={modal} toggle={toggle} className={'className'}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					ADD GENRE
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleCreate}>
						<FormGroup>
							<Label for='author'>Author</Label>
							<Input
								type='text'
								name='author'
								id='author'
								placeholder='Author Name'
								value={Genre.name || ''}
								onChange={(e) => setGenre({ ...Genre, name: e.target.value })}
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

const mapDispatchToProps = { insertGenre, getGenre }
export default connect(mapStateTopProps, mapDispatchToProps)(GenreModal)
