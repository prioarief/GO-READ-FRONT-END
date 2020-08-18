const initialState = {
	isLoading: false,
	error: false,
    errorMessage: null,
    history: null
};

const transaction = (state = initialState, action) => {
	switch (action.type) {
		case 'BORROW_PENDING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'BORROW_REJECTED': {
			return {
				...state,
				isLoading: false,
				error: true,
				errorMessage: action.payload,
			};
		}
		case 'BORROW_FULFILLED': {
			return {
				...state,
				isLoading: false,
			};
		}
		case 'RETURN_PENDING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'RETURN_REJECTED': {
			return {
				...state,
				isLoading: false,
				error: true,
				errorMessage: action.payload,
			};
		}
		case 'RETURN_FULFILLED': {
			return {
				...state,
				isLoading: false,
			};
		}
		case 'HISTORY_PENDING': {
			return {
				...state,
				isLoading: true,
				error: false,
				errorMessage: null,
			};
		}
		case 'HISTORY_REJECTED': {
			return {
				...state,
				isLoading: false,
				error: true,
				errorMessage: action.payload,
			};
		}
		case 'HISTORY_FULFILLED': {
			return {
				...state,
				error: false,
                isLoading: false,
                history: action.payload.data.data
			};
		}

		default:
			return state;
	}
};

export default transaction;
