import React, { Component } from 'react'
import { FormGroup, Label, Input, Button } from 'reactstrap'

class Login extends Component {
    constructor(props){
        super(props)
        console.log(this.props.data)
    }
	render() {
		return (
			<div>
				<div className='content'>
					<div className='text-right'>
						<img src='./bookshelf.png' className='bookshelf img-fluid' alt='' />
					</div>
					<div className='mt-5 font-weight-bold'>
						<h2 className='login font-weight-bold'>Login</h2>
						<p className='welcome'>
							Welcome Back, Please Login <br /> to your account{' '}
						</p>
					</div>
					<FormGroup>
						<div className='form-group-custom'>
							<Label for='email' className='label'>
								Email
							</Label>
							<Input type='email' placeholder='Enter Email' />
						</div>
					</FormGroup>
					<FormGroup>
						<div className='form-group-custom'>
							<Label for='password' className='label'>
								Password
							</Label>
							<Input type='password' placeholder='Enter Password' />
						</div>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type='checkbox' /> Remember me
						</Label>
						<a href='http://' className='forgot-password'>
							Forgot Password
						</a>
					</FormGroup>

					<FormGroup>
						<Button className='btn-login'>Login</Button>
						<Button className='btn-sign-up'>Sign Up</Button>
					</FormGroup>

                    <p className='policy'>By signing up, you agree to Book’s <br/> Terms and Conditions & Privacy Policy</p>
				</div>
			</div>
		)
	}
}

export default Login
