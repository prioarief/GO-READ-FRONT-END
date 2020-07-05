import axios from 'axios'

export const login = (data) => {
	return {
		type: 'LOGIN',
		payload: axios({
			method: 'POST',
			url: 'http://localhost:3000/api/auth/login',
			data: {
				email: data.email,
				password: data.password,
			},
		}),
	}
}
