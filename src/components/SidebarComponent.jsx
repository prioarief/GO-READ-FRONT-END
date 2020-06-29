import React, { useState } from 'react'

import style from './../styles/SidebarStyle.module.css'

const Sidebar = (props) => {
	const [collapsed, setCollapsed] = useState(true)

	const toggleNavbar = () => setCollapsed(!collapsed)

	return (
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
					<img src='./profile.png' alt='profile' className='avatar-profile' />
				</li>
					<h4 className='profile-name'>Prio Arief Gunawan</h4>
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
	)
}

export default Sidebar
