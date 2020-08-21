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
} from 'reactstrap';
import swal from 'sweetalert';
import {
	deleteGenre,
	editGenre,
	getGenre,
	insertGenre,
} from '../../../redux/actions/genre';
import style from '../../../styles/dashboard/book.module.css';
import Loading from '../../home/Loading';

export class GenreContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openModal: false,
			title: '',
			id: '',
			genre: '',
			genres: this.props.genre.value || null,
			isLoading: false,
		};
	}

	showModal = (e, id = null, type = null) => {
		e.preventDefault();
		if (type === 'close') {
			return this.setState({
				id: '',
				genre: '',
				title: '',
				openModal: !this.state.openModal,
			});
		}
		if (type === 'Edit Genre') {
			const data = this.props.genre.value;
			const filterData = data.filter((e) => {
				return e.id === id;
			});
			return this.setState({
				title: type,
				openModal: !this.state.openModal,
				id: filterData[0].id,
				genre: filterData[0].genre,
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
		const { genre } = this.state;
		const { dispatch, auth } = this.props;
		const token = auth.data.token;
		const data = {
			genre: genre,
		};

		this.setState({ isLoading: true });
		dispatch(insertGenre(token, data))
			.then(() => {
				dispatch(getGenre(token)).then(() => {
					this.setState({ genres: this.props.genre.value, openModal: false });
					this.setState({ isLoading: false });
					swal({
						title: 'Good Job',
						text: `Genre ${genre} succesfull added`,
						icon: 'success',
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
		const { genre, id } = this.state;
		const { dispatch, auth } = this.props;
		const token = auth.data.token;
		const data = {
			genre: genre,
		};

		this.setState({ isLoading: true });

		dispatch(editGenre(token, id, data))
			.then(() => {
				dispatch(getGenre(token)).then(() => {
					this.setState({
						genres: this.props.genre.value,
						openModal: false,
						genre: '',
					});
					this.setState({ isLoading: false });
					swal({
						title: 'Good Job',
						text: `Author with id ${id} has been edited`,
						icon: 'success',
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
					.dispatch(deleteGenre(token, param))
					.then((res) => {
						this.props.dispatch(getGenre(token)).then(() => {
							this.setState({
								genres: this.props.genre.value,
								openModal: false,
								author: '',
							});
							this.setState({ isLoading: false });
							swal(`Data id ${param} has been deleted!`, {
								icon: 'success',
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
				swal('Your imaginary file is safe!');
			}
		});
	};

	render() {
		return (
			<div>
				<h2 className={style.content_title}>Genre Data</h2>
				<Button
					color='info'
					className={style.btn_add}
					onClick={(e) => this.showModal(e, null, 'Add Genre')}
				>
					Add Genre
				</Button>
				<div className={style.content}>
					{this.state.isLoading && <Loading />}
					<Table striped className={style.table_content}>
						<thead>
							<tr>
								<th>#</th>
								<th>Genre</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.state.genres !== null &&
								this.state.genres.map((data, index) => {
									return (
										<tr key={index + 1}>
											<th scope='row'>{index + 1}</th>
											<td>{data.genre}</td>
											<td>
												<Button
													color='primary'
													size='sm'
													className={`style.btn_add mr-2 my-2`}
													onClick={async (e) => {
														this.showModal(e, data.id, 'Edit Genre');
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
									this.state.title === 'Edit Genre'
										? this.handleEdit
										: this.handleCreate
								}
							>
								<FormGroup>
									<Label for='genre'>Genre</Label>
									<Input
										autoFocus
										type='text'
										name='genre'
										id='genre'
										placeholder='Genre'
										value={this.state.genre}
										onChange={(e) => this.setState({ genre: e.target.value })}
									/>
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
	genre: state.genre,
});

export default connect(mapStateToProps)(GenreContent);
