import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input, Button, Spinner, Col, Form } from 'reactstrap'
import swal from 'sweetalert'
import axios from 'axios'
import style from '../styles/style.module.css'

const Login = (props) => {
	const [user, setUser] = useState({ email: localStorage.getItem('email'), code: '' })
	const [isLoading, setLoading] = useState(false)
	const [isSubmit, setSubmit] = useState(true)

	const handleActivation = (e) => {
		e.preventDefault()
		setLoading(true)
		setTimeout(() => {
			axios({
				method: 'POST',
				url: 'http://localhost:3000/api/auth/activation',
				data: {
					email: localStorage.getItem('email'),
					code: user.code,
				},
			})
			.then((res) => {
				swal('Good job!', 'Activation Success!, please login', 'success')
				props.data.push('/login')
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
			user.email.trim().length !== 0 && user.code.trim().length !== 0
				? false
				: true
		setSubmit(data)
	}, [user])

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
					<h2 className={`${style.login} font-weight-bold`}>Activation</h2>
					<p className='welcome'>
						Welcome Back, Please Activation for login <br /> to your account{' '}
					</p>
				</div>
				<Form onSubmit={handleActivation}>
					<FormGroup className={style.form_input}>
						<Label for='email' className={style.label}>
							Email
						</Label>
						<Input
							type='email'
							placeholder='Enter Email'
                            value={user.email}
                            readOnly
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
						<Label for='code' className={style.label}>
							Code
						</Label>
						<Input
							type='text'
							placeholder='Enter Code'
							value={user.code}
							onChange={(e) => setUser({ ...user, code: e.target.value })}
						/>
					</FormGroup>
					

					<Button
						className={style.btn_login}
						disabled={isSubmit}
					>
						Activation
					</Button>
				</Form>
				<p className={style.policy}>
					By signing up, you agree to Book’s <br /> Terms and Conditions &
					Privacy Policy
				</p>
			</div>
		</div>
	)
}

export default Login
