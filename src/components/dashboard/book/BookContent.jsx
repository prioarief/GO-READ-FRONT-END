import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Table,
	FormText,
} from 'reactstrap';
import swal from 'sweetalert';
import {
	deleteBook,
	editBook,
	getBook,
	insertBook,
} from '../../../redux/actions/book';
import style from '../../../styles/dashboard/book.module.css';
import Loading from '../../home/Loading';
import { getGenre } from '../../../redux/actions/genre';
import { getAuthor } from '../../../redux/actions/author';

export class BookContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
			title: '',
			id: '',
			book: {
				title: '',
				image: '',
				desc: '',
				author: null,
				genre: null,
				status: '',
			},
			books: this.props.book.value || null,
			authors: this.props.author.value || null,
			genres: this.props.genre.value || null,
			isLoading: false,
		};
	}

	showModal = (e, id = null, type = null) => {
		e.preventDefault();
		if (type === 'close') {
			return this.setState({
				id: '',
				book: {
					title: '',
					image: '',
					desc: '',
					author: null,
					genre: null,
					status: '',
				},
				title: '',
				openModal: !this.state.openModal,
			});
		}
		if (type === 'Edit Book') {
			const data = this.props.book.value;
			const filterData = data.filter((e) => {
				return e.id === id;
			});
			return this.setState({
				title: type,
				openModal: !this.state.openModal,
				id: filterData[0].id,
				book: {
					title: filterData[0].title,
					image: filterData[0].image,
					desc: filterData[0].description,
					author: filterData[0].author_id,
					genre: filterData[0].genre_id,
					status: filterData[0].status,
				},
			});
		}
		this.setState({ title: type, openModal: !this.state.openModal });
	};

	closeBtn = (
		<button className='close' onClick={(e) => this.showModal(e, null, 'close')}>
			&times;
		</button>
	);

	handleCreate = async (e) => {
		e.preventDefault();
		const { book } = this.state;
		const { dispatch, auth } = this.props;
		const token = auth.data.token;
		const formData = new FormData();
		formData.append('title', book.title);
		formData.append('status', 'Available');
		formData.append('description', book.desc);
		formData.append('genre_id', book.genre);
		formData.append('author_id', book.author);

		if(book.genre === null || book.author === null) {
			return swal({
				title: 'Ooopss',
				text: 'Genre or Author not allowed to be empty',
				icon: 'error',
			});
		}

		if (typeof book.image === 'object') {
			if (
				book.image[0].size > 4065358 ||
				(book.image[0].type !== 'image/png' &&
					book.image[0].type !== 'image/jpeg')
			) {
				return swal({
					title: 'Ooopss',
					text: 'Just support img/jpg file and max 4mb',
					icon: 'error',
				});
			}
			formData.append('image', book.image[0]);
		} else {
			return swal({
				title: 'Ooopss',
				text: 'Image not allowed to be empty',
				icon: 'error',
			});
		}
		this.setState({ isLoading: true });
		dispatch(insertBook(token, formData))
			.then(() => {
				dispatch(getBook(token)).then(() => {
					this.props.dispatch(getGenre(token)).then(() => {
						this.props.dispatch(getAuthor(token)).then(() => {
							this.setState({
								books: this.props.book.value,
								openModal: false,
								author: '',
							});
							this.setState({ isLoading: false });
							swal({
								title: 'Good Job',
								text: `Book ${book.title} succesfull added`,
								icon: 'success',
							});
						});
					});
				});
			})
			.catch((err) => {
				this.setState({ isLoading: false });
				console.log(err);
			});
	};

	handleEdit = async (e) => {
		e.preventDefault();
		const { book, id } = this.state;
		const { dispatch, auth } = this.props;
		const token = auth.data.token;
		const formData = new FormData();
		formData.append('title', book.title);
		formData.append('description', book.desc);
		formData.append('genre_id', parseInt(book.genre));
		formData.append('author_id', parseInt(book.author));

		if(book.genre === null || book.author === null) {
			return swal({
				title: 'Ooopss',
				text: 'Genre or Author not allowed to be empty',
				icon: 'error',
			});
		}

		if (typeof book.image === 'object') {
			if (
				book.image[0].size > 4065358 ||
				(book.image[0].type !== 'image/png' &&
					book.image[0].type !== 'image/jpeg')
			) {
				return swal({
					title: 'Ooopss',
					text: 'Just support img/jpg file and max 4mb',
					icon: 'error',
				});
			}
			formData.append('image', book.image[0]);
		}

		this.setState({ isLoading: true });

		dispatch(editBook(token, id, formData))
			.then(() => {
				dispatch(getBook(token)).then(() => {
					dispatch(getGenre(token)).then(() => {
						this.setState({
							books: this.props.book.value,
							openModal: false,
							book: {
								title: '',
								image: '',
								desc: '',
								author: '',
								genre: '',
								status: '',
							},
						});
						this.setState({ isLoading: false });
						swal({
							title: 'Good Job',
							text: `Book with id ${id} has been edited`,
							icon: 'success',
						});
					});
				});
			})
			.catch((err) => {
				this.setState({ isLoading: false });
				console.log(err);
			});
	};

	handleDelete = (param) => {
		swal({
			title: 'Are you sure?',
			text:
				'Once deleted, you will not be able to recover this imaginary file!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.setState({ isLoading: true });
				const token = this.props.auth.data.token;
				this.props
					.dispatch(deleteBook(token, param))
					.then((res) => {
						this.props.dispatch(getBook(token)).then(() => {
							this.props.dispatch(getGenre(token)).then(() => {
								this.props.dispatch(getAuthor(token)).then(() => {
									this.setState({
										books: this.props.book.value,
										openModal: false,
										author: '',
									});
									this.setState({ isLoading: false });
									swal(`Data id ${param} has been deleted!`, {
										icon: 'success',
									});
								});
							});
						});
					})
					.catch((err) => {
						this.setState({ isLoading: false });
						swal('Poof! Your imaginary file has been deleted!', {
							icon: 'error',
						});
						console.log(err);
					});
			} else {
				swal('Book is safe!');
			}
		});
	};

	render() {
		const { book, books, authors, genres } = this.state;
		return (
			<div>
				<h2 className={style.content_title}>Book Data</h2>
				<Button
					color='info'
					className={style.btn_add}
					onClick={(e) => this.showModal(e, null, 'Add Book')}
				>
					Add Book
				</Button>
				<div className={style.content}>
					{this.state.isLoading && <Loading />}
					<Table striped className={style.table_content}>
						<thead>
							<tr>
								<th>#</th>
								<th>Book</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{books !== null &&
								books.map((data, index) => {
									return (
										<tr key={index + 1}>
											<th scope='row'>{index + 1}</th>
											<td>{data.title}</td>
											<td>
												<Button
													color='primary'
													size='sm'
													className={`style.btn_add mr-2 my-2`}
													onClick={async (e) => {
														this.showModal(e, data.id, 'Edit Book');
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
														e.preventDefault();
														this.handleDelete(data.id);
													}}
												>
													<FontAwesomeIcon icon={faTrashAlt} />
												</Button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
					<Modal
						isOpen={this.state.openModal}
						toggle={this.showModal}
						className={'className'}
					>
						<ModalHeader toggle={this.showModal} close={this.closeBtn}>
							{this.state.title}
						</ModalHeader>
						<ModalBody>
							<Form
								onSubmit={
									this.state.title === 'Edit Book'
										? this.handleEdit
										: this.handleCreate
								}
							>
								<FormGroup>
									<Label for='title'>Title</Label>
									<Input
										autoFocus
										type='text'
										name='title'
										id='title'
										placeholder='Title...'
										value={book.title}
										onChange={(e) =>
											this.setState({
												book: { ...book, title: e.target.value },
											})
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label for='image'>Image</Label>
									<br />
									{book.image !== '' && typeof book.image !== 'object' && (
										<img
											src={`${process.env.REACT_APP_API_URL}/images/${book.image}`}
											alt='book'
											style={{ width: 300, height: 300, objectFit: 'cover' }}
											className='img-fluid mb-3'
										/>
									)}
									<Input
										type='file'
										name='file'
										id='image'
										onChange={(e) =>
											this.setState({
												book: { ...book, image: e.target.files },
											})
										}
									/>
									<FormText color='muted'>
										Just Support jpeg/jpg/png type
									</FormText>
								</FormGroup>
								<FormGroup>
									<Label for='desc'>Description</Label>
									<Input
										type='textarea'
										name='text'
										id='desc'
										value={book.desc}
										onChange={(e) =>
											this.setState({ book: { ...book, desc: e.target.value } })
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label for='genre'>Genre</Label>
									<Input
										type='select'
										name='genre'
										id='genre'
										defaultValue={book.genre}
										onChange={(e) =>
											this.setState({
												book: { ...book, genre: e.target.value },
											})
										}
									>
										<option disabled={false} value={null}>
											Select Genre
										</option>
										{genres !== null &&
											genres.map((genre) => {
												return (
													<option key={genre.id} value={genre.id}>
														{genre.genre}
													</option>
												);
											})}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for='author'>Author</Label>
									<Input
										type='select'
										name='author'
										id='author'
										defaultValue={book.author}
										onChange={(e) =>
											this.setState({
												book: { ...book, author: e.target.value },
											})
										}
									>
										<option disabled={false} value={null}>
											Select author
										</option>
										{authors !== null &&
											authors.map((author) => {
												return (
													<option key={author.id} value={author.id}>
														{author.author}
													</option>
												);
											})}
									</Input>
								</FormGroup>
								<Button color='primary' className={style.btn_create}>
									{this.state.title}
								</Button>{' '}
							</Form>
						</ModalBody>
					</Modal>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	author: state.author,
	book: state.book,
	genre: state.genre,
});

export default connect(mapStateToProps)(BookContent);
