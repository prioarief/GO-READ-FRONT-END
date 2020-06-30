import React, { Component } from 'react'
// import Sidebar from '../components/SidebarComponent'
import Navbar from '../components/NavbarComponent'
import ListBook from '../components/ListBook'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
// import Slider from '../components/SliderComponent'
// import { Col, Row } from 'reactstrap'

const Home = (props) => {
	const [books, setBook] = useState([])

	const getBook = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: 'http://localhost:3000/api/books',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				setBook(res.data.data)
			})
			.catch((err) => {
				console.log(err.response)
			})
	}
	useEffect(() => {

		getBook()
	})

	return (
		<div>
			<Navbar/>
			<ListBook data={books} />
		</div>
	)
}

// class Home extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			books: [],
// 		}
// 	}

// 	getBook = () => {
// 		const token = localStorage.getItem('RefreshToken')
// 		axios({
// 			method: 'GET',
// 			url: 'http://localhost:3000/api/books',
// 			headers: {
// 				Authorization: token,
// 			},
// 		})
// 			.then((res) => {
// 				this.setState({ books: res.data.data })
// 			})
// 			.catch((err) => {
// 				console.log(err.response)
// 			})
// 	}

// 	componentDidMount() {
// 		this.getBook()
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Navbar/>
// 				<ListBook data={this.state.books} />
// 			</div>
// 		)
// 	}
// }

export default Home
