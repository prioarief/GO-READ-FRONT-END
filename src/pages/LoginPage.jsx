import React, { Component } from 'react'
import AuthComponent from '../components/AuthComponent'
import LoginComponent from '../components/LoginComponent'

class LoginPage extends Component {
	render() {
		return (
			<div>
				<div className='col-sm'>
					<div className='row'>
						<div className='col-sm-7'>
							<AuthComponent />
						</div>
						<div className='col-sm-5 mt-4'>
							<LoginComponent data={'prio'} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginPage
