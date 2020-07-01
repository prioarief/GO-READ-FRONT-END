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

const NavbarComponent = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [collapsed, setCollapsed] = useState(true)
	const [search, setSearch] = useQueryState('search', '')
	const [show, setShow] = useQueryState('show', '')
	const [sort, setSort] = useQueryState('sort', '')

	const toggleNavbar = () => setCollapsed(!collapsed)
	const [modal, setModal] = useState(false)
	const toggle = () => setIsOpen(!isOpen)
	const closeModal = () => setModal(!modal)
	const closeBtn = (
		<button className='close' onClick={closeModal}>
			&times;
		</button>
	)

	// console.log(props.data('nav'))

	const handleSearch = (e) => {
		// console.log(e.target.value)
		 setSearch(e.target.value)
		// props.data(search)
	}
	
	const sendData = {
		search,
		show,
		sort
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
				className={collapsed || style.navbar_topbar}
			>
				<nav className={style.sidebar}>
					<div className={`${style.menu_toggle} ${style.slide}`}>
						<input type='checkbox' name='' id='' onClick={toggleNavbar} />
						<span></span>
						<span></span>
						<span></span>
					</div>
					<ul className={collapsed || style.slide}>
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
							<Link>Explore</Link>
						</li>
						<li>
							<Link>History</Link>
						</li>

						{(localStorage.getItem('role') === 'Admin') && (
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
				<NavbarBrand href='/' className={collapsed || style.brand}>
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
									return <DropdownItem>{genre.genre}</DropdownItem>
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
								<DropdownItem onClick={(e) => setSort('title')}>
									A-Z
								</DropdownItem>
								<DropdownItem>Z-A</DropdownItem>
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
					<Form>
						<FormGroup>
							<Label for='title'>Title</Label>
							<Input
								type='text'
								name='title'
								id='title'
								className={style.input_title}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='image'>Image</Label>
							<Input type='file' name='file' id='image' />
							<FormText color='muted'>
								This is some placeholder block-level help text for the above
								input. It's a bit lighter and easily wraps to a new line.
							</FormText>
						</FormGroup>
						<FormGroup>
							<Label for='author'>Author</Label>
							<Input type='select' name='select' id='author'>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for='genre'>Genre</Label>
							<Input type='select' name='select' id='genre'>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for='desc'>Description</Label>
							<Input type='textarea' name='text' id='desc' />
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={toggle}>
						Do Something
					</Button>{' '}
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default NavbarComponent
