const inialState = {
	value: null,
	detail: {},
	errosMsg: null,
};

const genre = (state = inialState, action) => {
	switch (action.type) {
		case 'GENRE_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			};
		}
		case 'GENRE_REJECTED': {
			console.log(action.payload);
			return {
				...state,
				errorMsg: action.payload,
				value: null,
			};
		}
		case 'GENRE_FULFILLED': {
			return {
				...state,

				// errorMsg: null,
				value: action.payload.data.data,
			};
		}

		case 'INSERT_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			};
		}
		case 'INSERT_REJECTED': {
			console.log(action.payload);
			return {
				...state,
				errorMsg: action.payload,
				value: {},
			};
		}
		case 'INSERT_FULFILLED': {
			return {
				...state,

				// errorMsg: null,
				// value: action.payload.data.data,
			};
		}
		case 'EDIT_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			};
		}
		case 'EDIT_REJECTED': {
			console.log(action.payload);
			return {
				...state,
				errorMsg: action.payload,
				// value: {},
			};
		}
		case 'EDIT_FULFILLED': {
			return {
				...state,
				errorMsg: null,
			};
		}

		case 'DELETE_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			};
		}
		case 'DELETE_REJECTED': {
			console.log(action.payload);
			return {
				...state,
				errorMsg: action.payload,
			};
		}
		case 'DELETE_FULFILLED': {
			return {
				...state,

				// errorMsg: null,
				// value: action.payload.data.data,
			};
		}

		default: {
			return state;
		}
	}
};

export default genre;
