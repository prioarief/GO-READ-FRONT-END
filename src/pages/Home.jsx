import React, { Component } from 'react'
// import Sidebar from '../components/SidebarComponent'
import Navbar from '../components/NavbarComponent'
import ListBook from '../components/ListBook'
import Pagination from '../components/Pagination'
import axios from 'axios'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
			genres: [],
			search: '',
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

	handleParams = (parameter) => {
		this.getBook(parameter, this.getParams().get('sort'), this.getParams().get('show'), this.getParams().get('by') )
	}
	componentDidMount() {
		// console.log(this.getParams().get('sort'))
		if(!localStorage.getItem('token')){
			this.props.history.push('/login')
		}
		this.handleParams()
		this.getCategory()
	}

	render() {
		return (
			<div>
				<Navbar genres={this.state.genres} data={this.handleParams} />
				<ListBook data={this.state.books} />
				<Pagination />
			</div>
		)
	}
}

export default Home
