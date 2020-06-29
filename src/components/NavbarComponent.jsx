import React, { useState } from 'react'
import style from './../styles/SidebarStyle.module.css'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Input,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
	FormGroup,
} from 'reactstrap'

const NavbarComponent = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [collapsed, setCollapsed] = useState(false)

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
							<DropdownToggle nav caret>
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
							<DropdownToggle nav caret>
								All Times
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Option 1</DropdownItem>
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						{/* <FormGroup className={'style.search'}>
							<Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
						</FormGroup> */}
					</Nav>
					{/* <NavbarText>Simple Text</NavbarText> */}
				</Collapse>
			</Navbar>
		</div>
	)
}

export default NavbarComponent
