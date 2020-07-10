const inialState = {
	value: [],
	detail : {},
	errosMsg: null
}

const author = (state = inialState, action) => {
	switch (action.type) {
		case 'AUTHOR_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			}
		}
		case 'AUTHOR_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				errorMsg: action.payload,
				value: {},
				
			}
		}
		case 'AUTHOR_FULFILLED': {
			return {
				...state,
				errorMsg: null,
				value: action.payload.data.data,
			}
		}
		
		case 'DETAIL_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			}
		}
		case 'DETAIL_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				errorMsg: action.payload,
				value: {},
				
			}
		}
		case 'DETAIL_FULFILLED': {
			return {
				// ...state,

				errorMsg: null,
				// value: action.payload.data.data,
				detail : action.payload.data.data
			}
		}

		case 'INSERT_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			}
		}
		case 'INSERT_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				errorMsg: action.payload,
				// value: {},
				
			}
		}
		case 'INSERT_FULFILLED': {
			return {
				...state,

				// errorMsg: null,
				// value: action.payload.data.data,
			}
		}
		
		case 'DELETE_PENDING': {
			return {
				...state,
				errorMsg: null,
				value: {},
			}
		}
		case 'DELETE_REJECTED': {
			console.log(action.payload)
			return {
				...state,
				errorMsg: action.payload,
				// value: {},
				
			}
		}
		case 'DELETE_FULFILLED': {
			return {
				...state,

				// errorMsg: null,
				// value: action.payload.data.data,
			}
		}

		default: {
			return state
		}
	}
}

export default author
