import React from 'react'
import style from '../../styles/navbar/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBookReader,
	faBook,
	faTachometerAlt,
	faFeatherAlt,
	faTags,
	faUserFriends,
	faUserShield,
} from '@fortawesome/free-solid-svg-icons'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const Sidebar = (props) => {
	const [menu, setMenu] = useState('Dashboard')

	useEffect(() => {
		props.menu(menu)
	}, [menu])
	return (
		<div>
			<Navbar light expand='md' className={style.sidebar}>
				<NavbarBrand href='/' className={style.title_sidebar}>
					<span className={style.title}>GO READ</span>{' '}
					<FontAwesomeIcon icon={faBookReader} size='lg' />
				</NavbarBrand>
				<Nav className={`mr-auto ${style.nav_item}`} navbar>
					<NavItem>
						<Link to='/dashboard' className={style.link} onClick={(e) => setMenu('Dashboard')}>
							<FontAwesomeIcon icon={faTachometerAlt} size='lg' />{' '}
							<span className={style.link_item}>Dashboard</span>
						</Link>
						<Link to='/dashboard' className={style.link} onClick={(e) => setMenu('Admin')}>
							<FontAwesomeIcon icon={faUserShield} size='lg' />{' '}
							<span className={style.link_item}>Administrators</span>
						</Link>
						<Link to='/dashboard' className={style.link} onClick={(e) => setMenu('Author')}>
							<FontAwesomeIcon icon={faFeatherAlt} size='lg' />{' '}
							<span className={style.link_item}>Author</span>
						</Link>
						<Link to='/dashboard' className={style.link} onClick={(e) => setMenu('Book')}>
							<FontAwesomeIcon icon={faBook} size='lg' />{' '}
							<span className={style.link_item}>Book</span>
						</Link>
						<Link to='/dashboard' className={style.link} onClick={(e) => setMenu('Genre')}>
							<FontAwesomeIcon icon={faTags} size='lg' />{' '}
							<span className={style.link_item}>Genre</span>
						</Link>
						<Link to='/dashboard' className={style.link} onClick={(e) => setMenu('User')}>
							<FontAwesomeIcon icon={faUserFriends} size='lg' />{' '}
							<span className={style.link_item}>Users</span>
						</Link>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	)
}

export default Sidebar
