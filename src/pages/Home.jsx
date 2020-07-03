import React, { Component } from 'react'
import Navbar from '../components/NavbarComponent'
import ListBook from '../components/ListBook'
import Pagination from '../components/Pagination'
import axios from 'axios'
import SliderComponent from '../components/SliderComponent'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
			genres: [],
			authors: [],
			image: [],
		}
	}

	getParams = () => {
		return new URLSearchParams(this.props.location.search)
	}

	getBook = (search, sort, show, by) => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: 'http://localhost:3000/api/books',
			params: {
				show: show,
				sort: sort,
				page: 1,
				search: search,
				by: by,
			},
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				this.setState({ books: res.data.data })
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

	handleParams = (parameter) => {
		this.getBook(
			parameter,
			this.getParams().get('sort'),
			this.getParams().get('show'),
			this.getParams().get('by')
		)
	}
	componentDidMount() {
		if (!localStorage.getItem('token')) {
			this.props.history.push('/login')
		}
		this.handleParams()
		this.getCategory()
		this.getAuthor()
		this.getImage()
	}

	render() {
		return (
			<div>
				<Navbar genres={this.state.genres} authors={this.state.authors} data={this.handleParams} data_red={this.props.history} />
				<SliderComponent data={this.state.image}/>
				<ListBook data={this.state.books} />
				<Pagination
					data={this.state.image}
					show={this.getParams().get('show')}
					page={this.getParams().get('page')}
				/>
			</div>
		)
	}
}

export default Home
