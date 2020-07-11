import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteGenre } from '../../../redux/actions/genre'
import style from '../../../styles/dashboard/book.module.css'
import {
	Button,
	Table,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import GenreModal from './GenreModal'
import swal from 'sweetalert'

const Content = (props) => {
	const [genre, setGenre] = useState(props.genre.value)
	const [id, setId] = useState(0)
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
					.deleteGenre(token, param)
					.then((res) => {
						swal(`Data id ${param} has been deleted!`, {
							icon: 'success',
						})
						props.data.push('/dashboard')
					})
					.catch((err) => {
						swal('Poof! Your imaginary file has been deleted!', {
							icon: 'error',
						})
						console.log(err)
						props.data.push('/dashboard')
					})
				// Axios({
				// 	method: 'DELETE',
				// 	url: `http://localhost:3000/api/authors/${param}`,
				// 	headers: {
				// 		Authorization: token,
				// 	},
				// })
				// 	.then((res) => {
				// 		swal(`Data id ${param} has been deleted!`, {
				// 			icon: 'success',
				// 		})
				// 		// props.data_red.push('/books')
				// 	})
				// 	.catch((err) => {
				// 		swal('Poof! Your imaginary file has been deleted!', {
				// 			icon: 'error',
				// 		})
				// 		console.log(err)
				// 		// props.data_red.push('/books')
				// 	})
			} else {
				swal('Your imaginary file is safe!')
			}
		})
	}
	
	const handleEdit = (param) => {
		// props.getDetailAuthor(props.auth.data.token, param)
		setId(param)
		console.log(param)
		setOpen(true)

	}

	// console.log(author)
	// useEffect(() => {
	// 	props.getBook(props.auth.data.token)
	// 	setBook(props.book.value)
	// 	console.log(props)
	// }, [props])
	return (
		<div>
			<h2 className={style.content_title}>Genre Data</h2>
			<Button color='info' className={style.btn_add} onClick={showModal}>
				Add Genre
			</Button>
			<div className={style.content}>
				<Table striped className={style.table_content}>
					<thead>
						<tr>
							<th>#</th>
							<th>Genre Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{genre.map((data, index) => {
							return (
								<tr key={index + 1}>
									<th scope='row'>{index + 1}</th>
									<td>{data.genre}</td>
									<td>
										<Button
											color='primary'
											size='sm'
											className={`style.btn_add mr-2`}
											onClick={((e) => {
												e.preventDefault()
												handleEdit(data.id)
											})}
											title='Edit'
											>
											<FontAwesomeIcon icon={faPencilAlt} />
										</Button>
										<Button
											color='danger'
											size='sm'
											title='Delete'
											onClick={((e) => {
												e.preventDefault()
												handleDelete(data.id)
											})}
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
			{/* <GenreModal
				open={openModal}
				setModal={setModal}
				data={props.data.push}
				param={id}
			/> */}
		</div>
	)
}

const mapStateTopProps = (state) => ({
	// book: state.book,
	// author: state.author,
	genre: state.genre,
	auth: state.auth,
})

const mapDispatchToProps = { deleteGenre }
export default connect(mapStateTopProps, mapDispatchToProps)(Content)
