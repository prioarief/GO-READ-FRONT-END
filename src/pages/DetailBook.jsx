import React, { Component } from 'react'
import axios from 'axios'
import Cover from '../components/CoverComponent'
import Content from '../components/ContentDetailBook'

class DetailBook extends Component {
	constructor(props) {
		super(props)
		this.state = {
			book: {},
			genres: [],
			authors: [],
		}
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

	getDetailBook = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: `http://localhost:3000/api/books/${this.props.match.params.book}`,
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				this.setState({book : res.data.data[0]})
			})
			.catch((err) => {
				console.log(err.response)
			})
    }
    
    componentDidMount(){
		this.getDetailBook()
		this.getAuthor()
		this.getCategory()
    }
	render() {
		return (
			<div>
				<Cover data={this.state.book} />
				<Content data={this.state.book} data_red={this.props.history} genres={this.state.genres} authors={this.state.authors} />
			</div>
		)
	}
}

export default DetailBook
