import React, { useState } from 'react'
import style from './../styles/SidebarStyle.module.css'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Input,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	FormGroup,
	Label,
	Form,
	NavbarText,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [collapsed, setCollapsed] = useState(true)

	const toggleNavbar = () => setCollapsed(!collapsed)
	const toggle = () => setIsOpen(!isOpen)

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
						<h4 className={style.profile_name}>Prio Arief Gunawan</h4>
						<li>
							<a href='/'>Explore</a>
						</li>
						<li>
							<a href='/'>History</a>
						</li>
						<li>
							<a href='/'>Add Book</a>
						</li>
					</ul>
				</nav>
				<NavbarBrand href='/' className={collapsed || style.brand}>
					Go Read
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse
					isOpen={isOpen}
					navbar
					// className={collapsed || style.topbar_item}
				>
					<Nav className='mr-auto' navbar>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret className='font-weight-bold'>
								All Categories
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Romance</DropdownItem>
								<DropdownItem>Sports</DropdownItem>
								<DropdownItem>Science</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret className='font-weight-bold'>
								All Times
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Option 1</DropdownItem>
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						{/* <label htmlFor="search" className={style.label_search}>Search</label>
						<input type='text' className={style.search} placeholder='Search Book' /> */}
						<Form inline>
							<FormGroup className={style.form_search}>
								<Label for='Keyword' className={style.label}>
									<FontAwesomeIcon icon={faSearch} />
								</Label>
								<Input
									type='text'
									placeholder='Book Search'
									className={style.input_search}
								/>
							</FormGroup>
						</Form>
					</Nav>
					<NavbarText>
						<img src='./bookshelf.png' alt='' className={style.bookshelf} />
						<span className={style.library}>Library</span>
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	)
}

export default NavbarComponent
