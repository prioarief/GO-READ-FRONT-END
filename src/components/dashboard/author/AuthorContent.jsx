import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	deleteAuthor,
	getAuthor,
	getDetailAuthor,
} from '../../../redux/actions/author'
import style from '../../../styles/dashboard/book.module.css'
import { Button, Table } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import AuthorModal from './AuthorModal'
import swal from 'sweetalert'

const AuthorContent = (props) => {
	const [author, setAuthor] = useState(props.author.value)
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

	const fetchAuthor = (token) => {
		props.dispatch(getAuthor(token))
	}

	const handleDelete = (param) => {
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
					.dispatch(deleteAuthor(token, param))
					.then((res) => {
						swal(`Data id ${param} has been deleted!`, {
							icon: 'success',
						})
						props.dispatch(getAuthor(token))
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
		setTitle('EDIT AUTHOR')
		setOpen(true)
		// props.getDetailAuthor(props.auth.data.token, param)
		// console.log(param)
		props.dispatch(getDetailAuthor(props.auth.data.token, param)).then(() => {
			// props.dispatch(getAuthor(props.auth.data.token))
		})
	}
	// useEffect(() => {
	// 	fetchAuthor(props.auth.data.token)
	// }, [])
	return (
		<div>
			<h2 className={style.content_title}>Author Data</h2>
			<Button color='info' className={style.btn_add} onClick={showModal}>
				Add Author
			</Button>
			<div className={style.content}>
				<Table striped className={style.table_content}>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{author.map((data, index) => {
							return (
								<tr key={index + 1}>
									<th scope='row'>{index + 1}</th>
									<td>{data.author}</td>
									<td>
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
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
			<AuthorModal
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
	// book: state.book,
	// genre: state.genre,
	author: state.author,
	auth: state.auth,
})

export default connect(mapStateTopProps)(AuthorContent)
