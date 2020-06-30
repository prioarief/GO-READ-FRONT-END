import React, { useState } from 'react'
import style from './../styles/SidebarStyle.module.css'

const SidebarComponent = (props) => {
	const [collapsed, setCollapsed] = useState(true)
    console.log(props)
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
					<img src='./mee.jpg' alt='profile' className={style.avatar_profile} />
				</li>
				<h4 className={style.profile_name}>Prio Arief Gunawan</h4>
				<li>
					<a href='/'>Explore</a>
				</li>
				<li>
					<a href='/'>History</a>
				</li>
				{/* <li>
					<a href='#' onClick={closeModal}>
						Add Book
					</a>
				</li> */}
			</ul>
		</nav>
	)
}

export default SidebarComponent
