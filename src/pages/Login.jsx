import React, {  } from 'react'
import AuthComponent from '../components/AuthComponent'
import LoginComponent from '../components/LoginComponent'
import { Col, Row } from 'reactstrap'

const Login = (props) => {
	// console.log(props.history.push)
	return (
		<Col >
			<Row>
				<Col md='7' style={{padding: '0px'}}>
					<AuthComponent />
				</Col>
				<Col md='5'>
					<LoginComponent data={props.history} />
				</Col>
			</Row>
		</Col>
	)
}

export default Login
