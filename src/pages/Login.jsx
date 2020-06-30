import React, {  } from 'react'
import AuthComponent from '../components/AuthComponent'
import LoginComponent from '../components/LoginComponent'
import { Col, Row } from 'reactstrap'

const Login = (props) => {
	console.log(props)
	return (
		<Col >
			<Row>
				<Col md='7' style={{padding: '0px'}}>
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
