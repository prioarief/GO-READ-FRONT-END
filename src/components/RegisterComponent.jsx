import React, { useEffect } from 'react'
import { FormGroup, Label, Input, Button, Form, Col, Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from '../styles/style.module.css'
import { useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

const Register = (props) => {
	const [user, setUser] = useState({ email: '', password: '', name: '' })
	const [isLoading, setLoading] = useState(false)
	const [isSubmit, setSubmit] = useState(true)
	const handleRegister = (e) => {
		e.preventDefault()
		setLoading(true)
		setTimeout(() => {
			Axios({
				method: 'POST',
				url: 'http://localhost:3000/api/auth/register',
				data: {
					name: user.name,
					email: user.email,
					password: user.password,
					role: '2',
				},
			})
			.then((res) => {
				swal('Good job!', 'Registration Success! Please activate your account', 'success')
				localStorage.setItem('email', user.email)
				props.data.push('/activation')
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
			user.email.trim().length !== 0 && user.password.trim().length !== 0 && user.name.trim().length !== 0
				? false
				: true
		setSubmit(data)
	}, [user])
	return (
		<div>
			<div className={style.content}>
				<div className='text-right'>
					<img src='./bookshelf.png' className='bookshelf img-fluid' alt='' />
				</div>
				<div className='mt-5 font-weight-bold'>
					<h2 className={`${style.login} font-weight-bold`}>Register</h2>
					<p className='welcome'>
						Welcome Back, Please Register <br /> to create account{' '}
					</p>
				</div>
				<Form onSubmit={handleRegister}>
					{/* <FormGroup className={style.form_input}>
					<Label for='Username' className={style.label}>
						Username
					</Label>
					<Input type='text' placeholder='Enter Username' />
				</FormGroup> */}
					<FormGroup className={style.form_input}>
						<Label for='Full Name' className={style.label}>
							Full Name
						</Label>
						<Input
							type='text'
							placeholder='Enter Full Name'
							value={user.name}
							onChange={(e) => setUser({ ...user, name: e.target.value })}
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

					<Button className={style.btn_login} disabled={isSubmit}>Sign Up</Button>
				<Link to='/login'>
					<Button className={style.btn_sign_up}>Login</Button>
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

export default Register
