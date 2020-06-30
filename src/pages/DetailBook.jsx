import React, { useState, useEffect, Component } from 'react'
// import { Col, Row, Container } from 'reactstrap'
import axios from 'axios'
import Cover from '../components/CoverComponent'
import Content from '../components/ContentDetailBook'

// const DetailBook = (props) => {
// 	const [book, setBook] = useState([])

// 	const getDetailBook = () => {
// 		const token = localStorage.getItem('RefreshToken')
// 		axios({
// 			method: 'GET',
// 			url: `http://localhost:3000/api/books/${props.match.params.book}`,
// 			// params: {
// 			// 	id: props.match.params.book,
// 			// },
// 			headers: {
// 				Authorization: token,
// 			},
// 		})
// 			.then((res) => {
// 				// console.log(res.data.data[0])
// 				setBook(res.data.data[0])
// 			})
// 			.catch((err) => {
// 				console.log(err.response)
// 			})
// 	}

// 	useEffect(() => {

//         getDetailBook()
// 		console.log(book)
// 	})

// 	return (
// 		<div>
// 			<Cover />
// 			<Content />
// 		</div>
// 	)
// }

class DetailBook extends Component {
	constructor(props) {
		super(props)
		this.state = {
			book: {},
		}
	}

	getDetailBook = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: `http://localhost:3000/api/books/${this.props.match.params.book}`,
			// params: {
			// 	id: props.match.params.book,
			// },
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				// console.log(res.data.data[0])
				this.setState({book : res.data.data[0]})
			})
			.catch((err) => {
				console.log(err.response)
			})
    }
    
    componentDidMount(){
        this.getDetailBook()
        // console.log(this.state.book);
        
    }
	render() {
		return (
			<div>
				<Cover data={this.state.book} />
				<Content data={this.state.book} />
                {/* <p>{this,this.state.book.title}</p> */}
			</div>
		)
	}
}

export default DetailBook
