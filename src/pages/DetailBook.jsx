import React, { Component } from 'react'
import axios from 'axios'
import Cover from '../components/CoverComponent'
import Content from '../components/ContentDetailBook'
import { connect } from 'react-redux'
import { detailBook, getBook } from '../redux/actions/book'

class DetailBook extends Component {
	constructor(props) {
		super(props)
		this.state = {
			book: {},
			genres: [],
			authors: [],
		}
	}

	// getCategory = () => {
	// 	const token = localStorage.getItem('RefreshToken')
	// 	axios({
	// 		method: 'GET',
	// 		url: 'http://localhost:3000/api/genres',
	// 		headers: {
	// 			Authorization: token,
	// 		},
	// 	})
	// 		.then((res) => {
	// 			this.setState({ genres: res.data.data })
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.response)
	// 		})
	// }
	// getAuthor = () => {
	// 	const token = localStorage.getItem('RefreshToken')
	// 	axios({
	// 		method: 'GET',
	// 		url: 'http://localhost:3000/api/authors',
	// 		headers: {
	// 			Authorization: token,
	// 		},
	// 	})
	// 		.then((res) => {
	// 			this.setState({ authors: res.data.data })
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.response)
	// 		})
	// }

	getDetailBook = () => {
		const token = this.props.auth.data.token
		this.props
			.dispatch(detailBook(token, this.props.match.params.book))
			.then(() => {
				this.props.dispatch(getBook(token))
			})
		// axios({
		// 	method: 'GET',
		// 	url: `http://localhost:3000/api/books/${this.props.match.params.book}`,
		// 	headers: {
		// 		Authorization: token,
		// 	},
		// })
		// 	.then((res) => {
		// 		this.setState({book : res.data.data[0]})
		// 	})
		// 	.catch((err) => {
		// 		console.log(err.response)
		// 	})
	}

	componentDidMount() {
		this.getDetailBook()
		// this.getAuthor()
		// this.getCategory()
	}
	render() {
		return (
			<div>
				<Cover data={this.props.book.detail[0]} />
				<Content
					data={this.state.book}
					data_red={this.props.history}
					genres={this.state.genres}
					authors={this.state.authors}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
})

export default connect(mapStateToProps)(DetailBook)
