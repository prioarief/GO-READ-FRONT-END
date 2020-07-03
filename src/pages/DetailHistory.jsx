import React, { Component } from 'react'
import axios from 'axios'
import Cover from '../components/CoverComponent'
import Content from '../components/ContentHistory'

class DetailBook extends Component {
	constructor(props) {
		super(props)
		this.state = {
			book: '',
		}
	}

	

	getDetailHistory = () => {
		const token = localStorage.getItem('RefreshToken')
		axios({
			method: 'GET',
			url: `http://localhost:3000/api/transaction/${this.props.match.params.book}`,
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
		this.getDetailHistory()
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
