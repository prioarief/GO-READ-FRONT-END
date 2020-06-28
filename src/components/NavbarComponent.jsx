import React, { useState } from 'react'
import className from 'classnames'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from 'reactstrap'

const NavbarComponent = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	return (
		<div className='topbar'>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque vitae
			aperiam officia provident quis, autem error maiores eligendi similique,
			ipsum modi debitis cupiditate itaque ad? Animi accusamus iste rerum
			dolore.
		</div>
	)
}

export default NavbarComponent
