import React, { Component } from 'react'
import AuthComponent from '../components/AuthComponent'
import RegisterComponent from '../components/RegisterComponent'

class RegisterPage extends Component {
	render() {
		return (
			<div>
				<div className='col-sm'>
					<div className='row'>
						<div className='col-sm-7'>
							<AuthComponent />
						</div>
						<div className='col-sm-5 mt-4'>
							<RegisterComponent data={'prio'} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterPage
