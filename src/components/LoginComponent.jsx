import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input, Button, Spinner, Col } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert'

const Login = (props) => {
	const [user, setUser] = useState({ email: '', password: '' })
	const [isLoading, setLoading] = useState(false)
	const [isRemember, setRemember] = useState(false)
	const [isSubmit, setSubmit] = useState(true)

	
	const loggin = () => {
		setLoading(true)
		let logged = null
		setTimeout(() => {
			setLoading(false)
			console.log(isRemember)
			logged =
				user.email === 'prio@gmail.com' && user.password === 'password'
					? true
					: false
			if (logged) {
				swal('Good job!', 'Login Success!', 'success')
				return <Redirect to='/register/'/>
			}else{
				return swal('Oooopssss!', 'Login Failled!', 'error')
			}
		}, 2000)
	}

	useEffect(() => {
		const data =
			user.email.trim().length !== 0 && user.password.trim().length !== 0
				? false
				: true
		setSubmit(data)
	}, [user])

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
					<Label for='email' className='label'>
						Email
					</Label>
					<Input
						type='email'
						placeholder='Enter Email'
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
					/>
				</FormGroup>
				{isLoading && (
					<Col md='12'>
						<Spinner className='login-spinner' type='grow' color='info' />{' '}
					</Col>
				)}
				<FormGroup>
					<Label for='password' className='label'>
						Password
					</Label>
					<Input
						type='password'
						placeholder='Enter Password'
						value={user.password}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
					/>
				</FormGroup>
				<FormGroup check>
					<Label check>
						<Input
							type='checkbox'
							value={isRemember}
							onChange={(e) => setRemember(e.target.checked)}
						/>{' '}
						Remember me
					</Label>
					<a href='http://' className='forgot-password'>
						Forgot Password
					</a>
				</FormGroup>

				<Button className='btn-login' disabled={isSubmit} onClick={loggin}>
					Login
				</Button>
				<Link to='/register'>
					<Button className='btn-sign-up'>Sign Up</Button>
				</Link>
				<p className='policy'>
					By signing up, you agree to Book’s <br /> Terms and Conditions &
					Privacy Policy
				</p>
			</div>
		</div>
	)
}

export default Login
