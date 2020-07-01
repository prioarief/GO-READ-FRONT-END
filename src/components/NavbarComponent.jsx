import React, { useState } from 'react'
import { useQueryState } from 'react-router-use-location-state'
// import sidebar from './SidebarComponent'
import style from './../styles/SidebarStyle.module.css'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	FormGroup,
	Label,
	Form,
	NavbarText,
	FormText,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

const NavbarComponent = (props) => {
	const [bookData, setBookData] = useState({
		title: '',
		image: '',
		genre: null,
		author: null,
		description: '',
	})
	const [isOpen, setIsOpen] = useState(false)
	const [collapsed, setCollapsed] = useState(true)
	const [search, setSearch] = useQueryState('search', '')
	const [show, setShow] = useQueryState('show', '')
	const [sort, setSort] = useQueryState('sort', '')
	// const [by, setBy] = useQueryState('by', '')

	const toggleNavbar = () => setCollapsed(!collapsed)
	const toggle = () => setIsOpen(!isOpen)
	const closeModal = () => setModal(!modal)
	const [modal, setModal] = useState(false)
	const closeBtn = (
		<button className='close' onClick={closeModal}>
			&times;
		</button>
	)

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}

	const handleCreate = (e) => {
		e.preventDefault()
		const token = localStorage.getItem('RefreshToken')
		const formData = new FormData()
		formData.append('title', bookData.title)
		formData.append('description', bookData.description)
		formData.append('image', bookData.image[0])
		formData.append('genre_id', bookData.genre)
		formData.append('author_id', bookData.author)
		formData.append('status', 'Available')
		console.log(bookData.genre)
		Axios({
			method: 'POST',
			url: 'http://localhost:3000/api/books',
			data: formData,
			headers: {
				Authorization: token,
				'Content-Type': 'multipart/form-data',
			},
		})
			.then((res) => {
				// console.log(res)
				swal('Good job!', 'Data Succesfull Created!', 'success')
				props.data_red.push('/books')
			})
			.catch((err) => {
				console.log(err.response.data.data)
				swal('Ooopss!', `${err.response.data.data}`, 'error')
			})
	}

	useEffect(() => {
		props.data(search)
	}, [search, show, sort])

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
								src='./mee.jpg'
								alt='profile'
								className={style.avatar_profile}
							/>
						</li>
						<h4 className={style.profile_name}>
							{localStorage.getItem('name')}
						</h4>
						<li>
							<Link to='/'>Explore</Link>
						</li>
						<li>
							<Link to='/'>History</Link>
						</li>

						{localStorage.getItem('role') === 'Admin' && (
							<li>
								<span style={{ cursor: 'pointer' }} onClick={closeModal}>
									Add Book
								</span>
							</li>
						)}
						{localStorage.getItem('name') && (
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
							<DropdownToggle nav caret className='font-weight-bold'>
								All Genres
							</DropdownToggle>
							<DropdownMenu right>
								{props.genres.map((genre) => {
									return (
										<DropdownItem key={genre.id}>{genre.genre}</DropdownItem>
									)
								})}
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret className='font-weight-bold'>
								All Times
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem onClick={(e) => setSort('latest')}>
									Latest
								</DropdownItem>
								<DropdownItem
									onClick={(e) => {
										setSort('title')
										// setBy('asc')
									}}
								>
									A-Z
								</DropdownItem>
								<DropdownItem
									onClick={(e) => {
										setSort('title')
										// setBy('desc')
									}}
								>
									Z-A
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret className='font-weight-bold'>
								Show
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem onClick={() => setShow(3)}>3</DropdownItem>
								<DropdownItem onClick={() => setShow(6)}>6</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<Form inline>
							<FormGroup className={style.form_search}>
								<Label for='Keyword' className={style.label}>
									<FontAwesomeIcon icon={faSearch} />
								</Label>
								<Input
									type='text'
									placeholder='Book Search'
									value={search}
									className={style.input_search}
									// onChange={(e) => setSearch(e.target.value)}
									onChange={handleSearch}
								/>
							</FormGroup>
						</Form>
					</Nav>
					<NavbarText>
						<img src='./bookshelf.png' alt='' className={style.bookshelf} />
						<span className={style.library}>
							Go Read <FontAwesomeIcon icon={faBookOpen} />
						</span>
					</NavbarText>
				</Collapse>
			</Navbar>
			<Modal
				isOpen={modal}
				toggle={toggle}
				centered
				className={style.modal_add}
			>
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
								className={style.input_title}
								onChange={(e) => setBookData({ ...bookData, title:  e.target.value })}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='image'>Image</Label>
							<Input
								type='file'
								name='file'
								id='image'
								onChange={(e) => setBookData({ ...bookData, image: e.target.files })}
							/>
							<FormText color='muted'>
								Just Support jpeg/jpg/png type
							</FormText>
						</FormGroup>
						<FormGroup>
							<Label for='author'>Author</Label>
							<Input
								type='select'
								name='author'
								id='author'
								onChange={(e) => setBookData({ ...bookData, author:   e.target.value })}
							>
								{props.authors.map((author) => {
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
								onChange={(e) => setBookData({ ...bookData, genre:  e.target.value } )}
							>
								{props.genres.map((genre) => {
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
								onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
							/>
						</FormGroup>
						<Button color='primary'>Create</Button>{' '}
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default NavbarComponent
