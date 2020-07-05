import React, { Component } from 'react'
import Navbar from '../components/NavbarComponent'
import ListBook from '../components/ListBook'
import Pagination from '../components/Pagination'
import axios from 'axios'
import SliderComponent from '../components/SliderComponent'
import {connect} from 'react-redux'


class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
			genres: [],
			authors: [],
			image: [],
			bookTotal : 0,
			page: 1
		}
		// console.log(this.props.auth)
	}

	getParams = () => {
		return new URLSearchParams(this.props.location.search)
	}

	getBook = (search, sort, page, show, by) => {
		const token = localStorage.getItem('RefreshToken')
		// const token = this.props.auth.data.token
		axios({
			method: 'GET',
			url: 'http://localhost:3000/api/books',
			params: {
				show: show,
				sort: sort,
				page: page,
				search: search,
				by: by,
			},
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				// console.log(res.data.length)
				this.setState({ books: res.data.data, bookTotal : res.data.length })
			})
			.catch((err) => {
				console.log(err)
			})
	}

	getCategory = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: 'http://localhost:3000/api/genres',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				this.setState({ genres: res.data.data })
			})
			.catch((err) => {
				console.log(err.response)
			})
	}
	getAuthor = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: 'http://localhost:3000/api/authors',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				this.setState({ authors: res.data.data })
			})
			.catch((err) => {
				console.log(err.response)
			})
	}

	getImage = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: 'http://localhost:3000/api/books/image',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				this.setState({ image: res.data.data })
			})
			.catch((err) => {
				console.log(err.response)
			})
	}

	handleParams = (search, page) => {
		this.getBook(
			search,
			this.getParams().get('sort'),
			page,
			this.getParams().get('show'),
			this.getParams().get('by')
		)
	}
	
	// handlePage = (parameter) => {
	// 	// this.getBook(
	// 	// 	this.getParams().get('search'),
	// 	// 	this.getParams().get('sort'),
	// 	// 	this.getParams().get('page'),
	// 	// 	parameter,
	// 	// 	this.getParams().get('by')
	// 	// )
	// 	console.log(parameter)
	// }
	componentDidMount() {
		// if (!localStorage.getItem('token')) {
		// 	this.props.history.push('/login')
		// }
		this.handleParams()
		this.getCategory()
		this.getAuthor()
		this.getImage()
		console.log(this.getParams().get('page') || 1)
	}
	
	componentDidUpdate(){
		// this.handleParams()
		// console.log(this.getParams().get('page'))

	}

	render() {
		return (
			<div>
				<Navbar genres={this.state.genres} authors={this.state.authors} data={this.handleParams} data_red={this.props.history} />
				<SliderComponent data={this.state.image}/>
				<ListBook data={this.state.books} />
				<Pagination
					data={this.state.bookTotal}
					show={this.getParams().get('show')}
					page={this.getParams().get('page')}
					qparams={this.handleParams}
					// parameter={this.handleParams}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

// const mapDispatchToProps

export default connect(mapStateToProps)(Home) 
