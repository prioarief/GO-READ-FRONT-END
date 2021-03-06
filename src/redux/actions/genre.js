import axios from 'axios'

export const getGenre = (token) => {
	return {
		type: 'GENRE',
		payload: axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/genres`,
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
			url: `${process.env.REACT_APP_API_URL}/api/genres`,
			data: data,
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const editGenre = (token, id, data) => {
	return {
		type: 'EDIT',
		payload: axios({
			method: 'PUT',
			url: `${process.env.REACT_APP_API_URL}/api/genres/${id}`,
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
			url: `${process.env.REACT_APP_API_URL}/api/genres/${id}`,
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const getDetailGenre = (token, id) => {
	return {
		type: 'DETAIL',
		payload: axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/genres/${id}`,
			headers: {
				Authorization : token
			}
		}),
	}
}
