import { faBookOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQueryState } from 'react-router-use-location-state';
import moment from 'moment';
import {
	Button,
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarText,
	NavbarToggler,
	Table,
	UncontrolledDropdown,
} from 'reactstrap';
// import sidebar from './SidebarComponent'
import style from './../styles/SidebarStyle.module.css';
import { History, Return } from '../redux/actions/transaction';
import swal from 'sweetalert';

const NavbarComponent = (props) => {
	const [genre] = useState(props.genre.value);
	const [isOpen, setIsOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(true);
	const [search, setSearch] = useQueryState('search', '');
	const [show, setShow] = useQueryState('show', 6);
	const [sort, setSort] = useQueryState('sort', '');
	const [modal, setModal] = useState(false);
	const [book, setBook] = useState('');

	const toggleHistory = () => setModal(!modal);

	const toggleNavbar = () => setCollapsed(!collapsed);
	const toggle = () => setIsOpen(!isOpen);

	const handleSearch = (e) => {
		if (e.key === 'Enter') {
			setSearch(e.target.value);
		}
	};

	const getHistory = async () => {
		setModal(!modal);
		const { dispatch, auth } = props;
		const token = auth.data.token;
		await dispatch(History(token))
			.then(async (res) => {
				await setBook(res.value.data.data);
			})
			.catch((err) => {
				console.log(err.response.status);
			});
	};

	const handleReturn = async (id) => {
		const { dispatch, auth } = props;
		const token = auth.data.token;
		await dispatch(Return(token, id))
			.then((res) => {
				swal('Book has been returned!', {
					icon: 'success',
				});
				props.data_red.push('/home');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		props.data(search, 1);
		// setPage(1)
	}, [search, show, sort]);

	return (
		<div>
			<Navbar
				color='light'
				light
				expand='md'
				className={collapsed ? '' : style.navbar_topbar}
			>
				<nav className={style.sidebar}>
					<div className={`${style.menu_toggle} ${style.slide}`}>
						<input type='checkbox' name='' id='' onClick={toggleNavbar} />
						<span></span>
						<span></span>
						<span></span>
					</div>
					<ul className={collapsed ? '' : style.slide}>
						<div className={`${style.menu_toggle} ${style.slide}`}>
							<input type='checkbox' name='' id='' onClick={toggleNavbar} />
							<span></span>
							<span></span>
							<span></span>
						</div>
						<li>
							<img
								src='./me.png'
								alt='profile'
								className={style.avatar_profile}
							/>
						</li>
						<h4 className={style.profile_name}>{props.auth.data.name}</h4>
						<li>
							<Link to='/books'>Explore</Link>
						</li>
						<li>
							<Link to='' onClick={getHistory}>
								History
							</Link>
						</li>

						{props.auth.data.token && (
							<li>
								<Link to='/logout'>Logout</Link>
							</li>
						)}
					</ul>
				</nav>
				<NavbarBrand href='/' className={collapsed ? '' : style.brand}>
					Go Read <FontAwesomeIcon icon={faBookOpen} />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle
								nav
								caret
								className={`font-weight-bold ${style.dropdown_nav}`}
							>
								All Genres
							</DropdownToggle>
							<DropdownMenu right>
								{genre.map((data) => {
									return (
										<DropdownItem key={data.id}>{data.genre}</DropdownItem>
									);
								})}
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle
								nav
								caret
								className={`font-weight-bold ${style.dropdown_nav}`}
							>
								All Times
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem
									onClick={(e) => {
										setSort('latest');
										// setBy('')
									}}
								>
									Latest
								</DropdownItem>
								<DropdownItem
									onClick={(e) => {
										setSort('title-asc');
										// setBy('asc')
									}}
								>
									A-Z
								</DropdownItem>
								<DropdownItem
									onClick={(e) => {
										setSort('title-desc');
										// setBy('desc')
									}}
								>
									Z-A
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle
								nav
								caret
								className={`font-weight-bold ${style.dropdown_nav}`}
							>
								Show
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem onClick={() => setShow(3)}>3</DropdownItem>
								<DropdownItem onClick={() => setShow(6)}>6</DropdownItem>
								<DropdownItem onClick={() => setShow(9)}>9</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>

						<FormGroup
							className={style.form_search}
							style={{ marginTop: '10px' }}
						>
							<Label for='Keyword' className={style.label}>
								<FontAwesomeIcon icon={faSearch} />
							</Label>
							<Input
								type='text'
								placeholder='Book Search'
								className={style.input_search}
								onKeyDown={handleSearch}
							/>
						</FormGroup>
					</Nav>
					<NavbarText>
						<img src='./bookshelf.png' alt='' className={style.bookshelf} />
						<span className={style.library}>
							Go Read <FontAwesomeIcon icon={faBookOpen} />
						</span>
					</NavbarText>
				</Collapse>
				<Modal isOpen={modal} toggle={toggleHistory} style={{ maxWidth: 900 }}>
					<ModalHeader toggle={toggleHistory}>Borrow History</ModalHeader>
					<ModalBody>
						<Table>
							<thead>
								<tr>
									<th>Book</th>
									<th>Borrowed at</th>
									<th>Returned at</th>
								</tr>
							</thead>
							<tbody>
								{props.history.history.map((data) => {
									return (
										<tr key={data.id}>
											<td>{data.title}</td>
											<td>{moment(data.borrowed_at).format('DD MMMM YYYY')}</td>
											<td>
												{data.returned_at === null ? (
													<Button
														color='info'
														onClick={(id) => handleReturn(data.id)}
													>
														Return
													</Button>
												) : (
													moment(data.returned_at).format('DD MMMM YYYY')
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</ModalBody>
					<ModalFooter>
						<Button color='secondary' onClick={toggleHistory}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Navbar>
		</div>
	);
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
	author: state.author,
	genre: state.genre,
	history: state.history,
});

// const mapDispatchToProps

export default connect(mapStateToProps)(NavbarComponent);
