import React, {  } from 'react'
import { FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import style from '../styles/style.module.css'

const Register = () => {
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
				<FormGroup className={style.form_input}>
					<Label for='Username' className={style.label}>
						Username
					</Label>
					<Input type='text' placeholder='Enter Username' />
				</FormGroup>
				<FormGroup className={style.form_input}>
					<Label for='Full Name' className={style.label}>
						Full Name
					</Label>
					<Input type='text' placeholder='Enter Full Name' />
				</FormGroup>
				<FormGroup className={style.form_input}>
					<Label for='email' className={style.label}>
						Email
					</Label>
					<Input type='email' placeholder='Enter Email' />
				</FormGroup>
				<FormGroup className={style.form_input}>
					<Label for='password' className={style.label}>
						Password
					</Label>
					<Input type='password' placeholder='Enter Password' />
				</FormGroup>

				<Button className={style.btn_login}>Sign Up</Button>
				<Link to='/login'>
					<Button className={style.btn_sign_up}>Login</Button>
				</Link>

				<p className={style.policy}>
					By signing up, you agree to Book’s <br /> Terms and Conditions &
					Privacy Policy
				</p>
			</div>
		</div>
	)
}

export default Register
