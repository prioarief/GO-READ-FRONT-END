import React, { useState } from 'react'

// import {
// 	Collapse,
// 	Navbar,
// 	NavbarToggler,
// 	NavbarBrand,
// 	Nav,
// 	NavItem,
// 	NavLink,
// } from 'reactstrap'

const Sidebar = (props) => {
	const [collapsed, setCollapsed] = useState(false)

	const toggleNavbar = () => setCollapsed(!collapsed)
	
	// if(collapsed){

	// }

	return (
			<nav>
				{/* <div className='logo'>
					<span>Prio Arief Gunawan</span>
				</div> */}
				<div className='menu-toggle'>
					<input type='checkbox' name='' id='' onClick={toggleNavbar} />
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul className={collapsed || 'slide'}>
					<li>
						<a href='/'>Home</a>
					</li>
					<li>
						<a href='/'>Products</a>
					</li>
					<li>
						<a href='/'>Services</a>
					</li>
					<li>
						<a href='/'>About</a>
					</li>
				</ul>
			</nav>
	)
}

export default Sidebar
