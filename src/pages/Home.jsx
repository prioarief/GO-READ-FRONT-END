import React, { Component } from 'react'
import Navbar from '../components/NavbarComponent'
import ListBook from '../components/ListBook'
import Pagination from '../components/Pagination'
import axios from 'axios'
import SliderComponent from '../components/SliderComponent'
import { connect } from 'react-redux'
import { getBook } from '../redux/actions/book'
import { getGenre } from '../redux/actions/genre'
import { getAuthor } from '../redux/actions/author'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
			genres: [],
			authors: [],
			image: [],
			bookTotal: 0,
			page: 1,
		}
		console.log(this.props.book)
	}

	getParams = () => {
		return new URLSearchParams(this.props.location.search)
	}

	getBook = (search, sort, page, show, by) => {
		const token = this.props.auth.data.token
		this.props
			.dispatch(getBook(token, show, search, page, sort, by))
			.then((res) => {
				// console.log(res)
			})
	}

	getCategory = () => {
		const token = this.props.auth.data.token
		this.props.dispatch(getGenre(token))
	}
	getAuthor = () => {
		const token = this.props.auth.data.token
		this.props.dispatch(getAuthor(token))
	}

	getImage = () => {
		const token = this.props.auth.data.token
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

	componentDidMount() {
		this.handleParams()
		this.getCategory()
		this.getAuthor()
		if(this.props.auth.data.role === 'Admin'){
			this.props.history.push('/dashboard')
		}
		if(!this.props.auth.data.token){
			this.props.history.push('/login')
		}
		// this.getImage()
	}

	componentDidUpdate() {}

	render() {
		return (
			<div>
				<Navbar
					data={this.handleParams}
					data_red={this.props.history}
				/>
				{/* <SliderComponent data={this.state.image} /> */}
				<ListBook data={this.props.book} />
				<Pagination
					show={this.getParams().get('show') || 6}
					page={this.getParams().get('page')}
					qparams={this.handleParams}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
})

export default connect(mapStateToProps)(Home)
