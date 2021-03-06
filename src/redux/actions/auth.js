import axios from 'axios'

export const Login = (data) => {
	return {
		type: 'LOGIN',
		payload: axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
			data: {
				email: data.email,
				password: data.password,
			},
		}),
	}
}

export const Register = (data) => {
	return {
		type: 'REGISTER',
		payload: axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_URL}/api/auth/register`,
			data: {
				email: data.email,
				password: data.password,
				name: data.name,
				role: 2,
			},
		}),
	}
}

export const Activation = (data) => {
	return {
		type: 'ACTIVATION',
		payload: axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_URL}/api/auth/activation`,
			data: {
				email: data.email,
				code : data.code
			},
		}),
	}
}

export const Logout = () => {
	return {
		type: 'LOGOUT',
	}
}
