import axios from 'axios';

export const Borrow = (token, id) => {
	return {
		type: 'BORROW',
		payload: axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/transaction/borrow/${id}`,
			headers: {
				Authorization: token,
			},
		}),
	};
};

export const Return = (token, id) => {
	return {
		type: 'RETURN',
		payload: axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_URL}/api/transaction/return/${id}`,
			headers: {
				Authorization: token,
			},
		}),
	}
}

export const History = (token) => {
	return {
		type: 'HISTORY',
		payload: axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_URL}/api/transaction/history`,
			headers: {
				Authorization: token,
			},
		}),
	}
}
