import axios from 'axios'

export const getGenre = (token) => {
	return {
		type: 'GENRE',
		payload: axios({
			method: 'GET',
			url: 'http://localhost:3000/api/genres',
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const insertGenre = (token, data) => {
	return {
		type: 'INSERT',
		payload: axios({
			method: 'POST',
			url: 'http://localhost:3000/api/genres',
			data: data,
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const deleteGenre = (token, id) => {
	return {
		type: 'DELETE',
		payload: axios({
			method: 'DELETE',
			url: `http://localhost:3000/api/genres/${id}`,
			headers: {
				Authorization: token,
			},
		}),
	}
}
