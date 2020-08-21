const inialState = {
	value: [],
	detail: {},
	count: 0,
	isLoading: null,
	error: null
}

const book = (state = inialState, action) => {
	switch (action.type) {
		case 'BOOK_PENDING': {
			// console.log(action.payload)
			return {
				...state,
				isLoading: true,
				// value: {},
			}
		}
		case 'BOOK_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				isLoading: false,
				error : action.payload,
				// value: {},
			}
		}
		case 'BOOK_FULFILLED': {
			// console.log(action.payload)
			return {
				...state,
				error : null,
				isLoading: false,
				value: action.payload.data.data,
				count: action.payload.data.length
			}
		}
		case 'INSERT_PENDING': {
			// console.log(action.payload)
			return {
				...state,
				value: {},
			}
		}
		case 'INSERT_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				error : action.payload.response.data.data,
				value: {},
			}
		}
		case 'INSERT_FULFILLED': {
			return {
				 ...state
				// value: action.payload.data.data,
			}
		}
		case 'DETAIL_PENDING': {
			// console.log(action.payload)
			return {
				...state,
				value: {},
			}
		}
		case 'DETAIL_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				error : action.payload.response.data.data,
				value: {},
			}
		}
		case 'DETAIL_FULFILLED': {
			return {
				 ...state,
				 detail: action.payload.data.data
				// value: action.payload.data.data,
			}
		}
		case 'DELETE_PENDING': {
			// console.log(action.payload)
			return {
				...state,
				value: {},
			}
		}
		case 'DELETE_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				error : action.payload.response.data.data,
				// value: {},
			}
		}
		case 'DELETE_FULFILLED': {
			return {
				 ...state
				// value: action.payload.data.data,
			}
		}
		
		case 'EDIT_PENDING': {
			// console.log(action.payload)
			return {
				...state,
				value: {},
			}
		}
		case 'EDIT_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				error : action.payload.response.data.data,
				// value: {},
			}
		}
		case 'EDIT_FULFILLED': {
			return {
				 ...state
				// value: action.payload.data.data,
			}
		}

		default: {
			return state
		}
	}
}

export default book
