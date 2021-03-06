import React from 'react'
import AuthComponent from '../components/AuthComponent'
import RegisterComponent from '../components/RegisterComponent'
import { Col, Row } from 'reactstrap'

const Register = (props) => {
	return (
		<Col>
			<Row>
				<Col md='7' style={{padding: '0px'}}>
					<AuthComponent />
				</Col>
				<Col md='5'>
					<RegisterComponent data={props.history} />
				</Col>
			</Row>
		</Col>
	)
}

export default Register
