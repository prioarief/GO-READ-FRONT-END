import React, {  } from 'react'
import AuthComponent from '../components/AuthComponent'
import LoginComponent from '../components/LoginComponent'
import { Col, Row } from 'reactstrap'

const Login = () => {
	return (
		<Col>
			<Row>
				<Col md='7'>
					<AuthComponent />
				</Col>
				<Col md='5'>
					<LoginComponent data={'prio'} />
				</Col>
			</Row>
		</Col>
	)
}

export default Login
