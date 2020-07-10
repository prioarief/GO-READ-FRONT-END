import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input, Button, Spinner, Col, Form } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import { Login as login } from '../redux/actions/auth'
import style from '../styles/style.module.css'

const Login = (props) => {
	const cookie = new Cookies()
	const [user, setUser] = useState({ email: cookie.get('email') || '', password: cookie.get('password') || '' })
	const [isLoading, setLoading] = useState(false)
	const [isRemember, setRemember] = useState(false)
	const [isSubmit, setSubmit] = useState(true)

	const handleLogin = (e) => {
		e.preventDefault()
		const data = {
			email: user.email,
			password: user.password,
		}


		setLoading(true)
		setTimeout(() => {
			props
				.login(data)
				.then(() => {
					if (isRemember) {
						cookie.set('email', data.email)
						cookie.set('password', data.password)
					}
					swal('Good job!', 'Login Success!', 'success')
					props.data.push('/home')
				})
				.catch((err) => {
					swal('Ooopss!', `${err.response.data.data}`, 'error')
				})
			setLoading(false)
		}, 1000)
	}

	useEffect(() => {
		const data =
			user.email.trim().length !== 0 && user.password.trim().length !== 0
				? false
				: true
		setSubmit(data)
	}, [user])

	// console.log(props.auth)
	return (
		<div>
			<div className={style.content}>
				<div className='text-right'>
					<img
						src='./bookshelf.png'
						className={`${style.bookshelf} img-fluid`}
						alt=''
					/>
				</div>
				<div className={`mt-5 font-weight-bold`}>
					<h2 className={`${style.login} font-weight-bold`}>Login</h2>
					<p className='welcome'>
						Welcome Back, Please Login <br /> to your account{' '}
					</p>
				</div>
				<Form onSubmit={handleLogin}>
					<FormGroup className={style.form_input}>
						<Label for='email' className={style.label}>
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
							<Spinner
								className={style.login_spinner}
								type='grow'
								color='info'
							/>{' '}
						</Col>
					)}
					<FormGroup className={style.form_input}>
						<Label for='password' className={style.label}>
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
						<a href='http://' className={style.forgot_password}>
							Forgot Password
						</a>
					</FormGroup>

					<Button
						className={style.btn_login}
						disabled={isSubmit}
						// onClick={loggin}
					>
						Login
					</Button>
					<Link to='/register'>
						<Button className={style.btn_sign_up}>Sign Up</Button>
					</Link>
				</Form>
				<p className={style.policy}>
					By signing up, you agree to Book’s <br /> Terms and Conditions &
					Privacy Policy
				</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
