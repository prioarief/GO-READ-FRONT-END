import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input, Button, Spinner, Col, Form } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../redux/actions/auth'
import style from '../styles/style.module.css'

const Login = (props) => {
	const [user, setUser] = useState({ email: '', password: '' })
	const [isLoading, setLoading] = useState(false)
	const [isRemember, setRemember] = useState(false)
	const [isSubmit, setSubmit] = useState(true)

	const handleLogin = (e) => {
		e.preventDefault()
		// const data = {
		// 	email : user.email,
		// 	password : user.password,
		// }

		// console.log(data)

		// props.login(data).then(() => {
		// 	props.data.push('/home')
		// 	// console.log(props)
		// })
		setLoading(true)
		setTimeout(() => {
			axios({
				method: 'POST',
				url: 'http://localhost:3000/api/auth/login',
				data: {
					email: user.email,
					password: user.password,
				},
			})
				.then((res) => {
					// console.log(props)
					// console.log(res)
					const token = res.data.data[0].token
					const RefreshToken = res.data.data[0].token
					swal('Good job!', 'Login Success!', 'success')
					localStorage.setItem('token', token)
					localStorage.setItem('name', res.data.data[0].name)
					localStorage.setItem('email', res.data.data[0].email)
					localStorage.setItem('role', res.data.data[0].role)
					localStorage.setItem('RefreshToken', RefreshToken)
					props.data.push('/books')
				})
				.catch((err) => {
					console.log(err.response.data.data)
					swal('Ooopsss!', `${err.response.data.data}!`, 'error')
				})
			setLoading(false)
		}, 2000)
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
