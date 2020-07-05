const initialState = {
	isLoading: false,
	isError: false,
	errorMessage: '',
	data: {},
}

const auth = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_PENDING':
			return {
				...state,
				isLoading: true,
				isError: false,
			}
		case 'LOGIN_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: 'Data Rejected',
			}
		case 'LOGIN_FULFILLED':
			console.log(action.payload.data.data[0])
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data.data[0]
			}

		default:
			return state
	}
}

export default auth
