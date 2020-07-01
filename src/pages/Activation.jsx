import React, {  } from 'react'
import AuthComponent from '../components/AuthComponent'
import ActivationComponent from '../components/ActivationComponent'
import { Col, Row } from 'reactstrap'

const Login = (props) => {
	return (
		<Col >
			<Row>
				<Col md='7' style={{padding: '0px'}}>
					<AuthComponent />
				</Col>
				<Col md='5'>
					<ActivationComponent data={props.history} />
				</Col>
			</Row>
		</Col>
	)
}

export default Login
