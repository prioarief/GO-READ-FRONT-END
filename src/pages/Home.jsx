import React from 'react'
import Sidebar from '../components/SidebarComponent'
import Navbar from '../components/NavbarComponent'
import { Col, Row } from 'reactstrap'

const Home = () => {
	return (
		<div>
			<Col>
				<Row>
					<Col md='6'>
						<Sidebar />
					</Col>
					<Col md='6'>
						<Navbar data={'prio'} />
					</Col>
				</Row>
			</Col>
		</div>
	)
}

export default Home
