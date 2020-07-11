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
import { connect } from 'react-redux'

const NavbarComponent = (props) => {
	const [genre] = useState(props.genre.value)
	const [isOpen, setIsOpen] = useState(false)
	const [collapsed, setCollapsed] = useState(true)
	const [search, setSearch] = useQueryState('search', '')
	const [show, setShow] = useQueryState('show', 6)
	const [sort, setSort] = useQueryState('sort', '')
	// const [page, setPage] = useQueryState('page', '')
	// const [by, setBy] = useQueryState('by', '')

	const toggleNavbar = () => setCollapsed(!collapsed)
	const toggle = () => setIsOpen(!isOpen)

	const handleSearch = (e) => {
		if(e.key === 'Enter'){
			setSearch(e.target.value)
		}

	}

	// const handleCreate = (e) => {
	// 	e.preventDefault()
	// 	const token = localStorage.getItem('RefreshToken')
	// 	const formData = new FormData()
	// 	formData.append('title', bookData.title)
	// 	formData.append('description', bookData.description)
	// 	formData.append('image', bookData.image[0])
	// 	formData.append('genre_id', bookData.genre)
	// 	formData.append('author_id', bookData.author)
	// 	formData.append('status', 'Available')
	// 	// console.log(bookData.genre)
	// 	Axios({
	// 		method: 'POST',
	// 		url: 'http://localhost:3000/api/books',
	// 		data: formData,
	// 		headers: {
	// 			Authorization: token,
	// 			'Content-Type': 'multipart/form-data',
	// 		},
	// 	})
	// 		.then((res) => {
	// 			// console.log(res)
	// 			swal('Good job!', 'Data Succesfull Created!', 'success')
	// 			props.data_red.push('/books')
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.response)
	// 			swal('Ooopss!', `${err.response.data.data}`, 'error')
	// 		})
	// }

	useEffect(() => {
		props.data(search, 1)
		// setPage(1)
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
							{props.auth.data.name}
						</h4>
						<li>
							<Link to='/books'>Explore</Link>
						</li>
						<li>
							<Link to='/history'>History</Link>
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
							<DropdownToggle nav caret className={`font-weight-bold ${style.dropdown_nav}`}>
								All Genres
							</DropdownToggle>
							<DropdownMenu right>
								{/* {genre.map((data) => {
									return (
										<DropdownItem key={data.id}>{data.genre}</DropdownItem>
									)
								})} */}
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret className={`font-weight-bold ${style.dropdown_nav}`}>
								All Times
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem
									onClick={(e) => {
										setSort('latest')
										// setBy('')
									}}
								>
									Latest
								</DropdownItem>
								<DropdownItem
									onClick={(e) => {
										setSort('title-asc')
										// setBy('asc')
									}}
								>
									A-Z
								</DropdownItem>
								<DropdownItem
									onClick={(e) => {
										setSort('title-desc')
										// setBy('desc')
									}}
								>
									Z-A
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret className={`font-weight-bold ${style.dropdown_nav}`}>
								Show
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem onClick={() => setShow(3)}>3</DropdownItem>
								<DropdownItem onClick={() => setShow(6)}>6</DropdownItem>
								<DropdownItem onClick={() => setShow(9)}>9</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						
							<FormGroup className={style.form_search} style={{marginTop: '10px'}}>
								<Label for='Keyword' className={style.label}>
									<FontAwesomeIcon icon={faSearch} />
								</Label>
								<Input
									type='text'
									placeholder='Book Search'
									// value={search}
									className={style.input_search}
									// onChange={(e) => setSearch(e.target.value)}
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
			</Navbar>
			
		</div>
	)
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
	author: state.author,
	genre: state.genre,
})

// const mapDispatchToProps

export default connect(mapStateToProps)(NavbarComponent)