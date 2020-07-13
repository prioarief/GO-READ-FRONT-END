import React, { useState } from 'react'
import style from '../../styles/navbar/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBars,
	faUserCircle,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
	Collapse,
	Navbar,
	NavbarBrand,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Topbar = (props) => {
	const [isOpen] = useState(true)
	const [isFull, setFull] = useState(false)

	// console.log(isFull)
	return (
		<div>
			<Navbar light expand='md' className={style.topbar}>
				<NavbarBrand className={style.title_topbar}>
					<FontAwesomeIcon
						icon={faBars}
						size='lg'
						onClick={(e) => {
							e.preventDefault()
							setFull(!isFull)
						}}
					/>
				</NavbarBrand>
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<UncontrolledDropdown nav inNavbar className={style.dropdown}>
							<DropdownToggle nav caret className={style.account}>
								<FontAwesomeIcon icon={faUserCircle} size='lg' />{' '}
								<span className={style.user}>{props.auth.data.email} </span>
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<Link to='/logout' className={style.logout}>
										<FontAwesomeIcon icon={faSignOutAlt} size='lg' /> Logout
									</Link>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	)
}

const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	auth: state.auth,
})

export default connect(mapStateTopProps)(Topbar)
