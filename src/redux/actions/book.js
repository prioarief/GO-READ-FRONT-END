import axios from 'axios'

export const getBook = (token, show, search, page, sort, by) => {
	// console.log(token)
	return {
		type: 'BOOK',
		payload: axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/books`,
			params: {
				search: search,
				show: show || 6,
				page: page || 1,
				sort: sort || 'latest',
				by: by,
			},
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const insertBook = (token, data) => {
	// console.log(token)
	return {
		type: 'INSERT',
		payload: axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_URL}/books`,
			data: data,
			headers: {
				Authorization: token,
				'Content-Type': 'multipart/form-data',
			},
		}),
	}
}

export const detailBook = (token, id) => {
	// console.log(token)
	return {
		type: 'DETAIL',
		payload: axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/books/${id}`,
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const deleteBook = (token, id) => {
	// console.log(token)
	return {
		type: 'DELETE',
		payload: axios({
			method: 'DELETE',
			url: `${process.env.REACT_APP_API_URL}/books/${id}`,
			headers: {
				Authorization: token,
			},
		}),
	}
}
export const editBook = (token, id, data) => {
	// console.log(token)
	return {
		type: 'EDIT',
		payload: axios({
			method: 'PUT',
			url: `${process.env.REACT_APP_API_URL}/books/${id}`,
			data: data,
			headers: {
				Authorization: token,
			},
		}),
	}
}
