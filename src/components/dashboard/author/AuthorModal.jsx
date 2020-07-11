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
import { insertAuthor, getAuthor } from '../../../redux/actions/author'
import swal from 'sweetalert'

const BookModal = (props) => {
	const [modal, setOpenModal] = useState(props.open)
	const [id, setId] = useState(props.param)
	const [Author, setAuthor] = useState('')
	// console.log(props)

	const toggle = () => {
		props.setModal(!modal)
		setOpenModal(!modal)
		setAuthor('')
	}
	
	const handleCreate = (e) => {
		e.preventDefault()
		const token = props.auth.data.token
		const data = {
			author: Author.name,
		}
		props.dispatch(insertAuthor(token, data)).then(() => {
			setOpen(!props.open)
			swal('Good job!', 'Data Successfully Added!', 'success')
			props.dispatch(getAuthor(token))
			// window.location.reload('/dashboard')
			// props.data('/dashboard')
		})
	}
	
	const setOpen = async (param) => {
		setOpenModal(param)
		setId(props.param)
		await setAuthor(props.author.detail[0].author)
		// getDetailAuthor(props.auth.data.token, props.param)
		// console.log(id)
	}

	const closeBtn = (
		<button className='close' onClick={toggle}>
			&times;
		</button>
	)

	useEffect(() => {
		modal ? setOpen(!props.open)  : setOpen(props.open)
		// setAuthor(props.author.detail[0].author)
		console.log(Author)
	}, [props.open])

	// useEffect(() => {
	// 	// getDetailAuthor(props.auth.data.token, 17)
	// 	// return () => {
	// 	// }
	// 	setAuthor(props.author.detail[0].author)
	// }, [props.author.detail[0].author])

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={'className'}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{props.titleModal || 'ADD AUTHOR'}
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleCreate}>
						<FormGroup>
							<Label for='author'>Author</Label>
							<Input
								autoFocus
								type='text'
								name='author'
								id='author'
								placeholder='Author Name'
								value={Author || ''}
								onChange={(e) => setAuthor( e.target.value )}
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
export default connect(mapStateTopProps)(BookModal)
