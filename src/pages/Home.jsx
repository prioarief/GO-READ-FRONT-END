import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListBook from '../components/ListBook';
import Navbar from '../components/NavbarComponent';
import Pagination from '../components/Pagination';
import { getAuthor } from '../redux/actions/author';
import { getBook } from '../redux/actions/book';
import { getGenre } from '../redux/actions/genre';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			genres: [],
			authors: [],
			image: [],
			bookTotal: 0,
			page: 1,
		};
	}

	getParams = () => {
		return new URLSearchParams(this.props.location.search);
	};

	getBook = async (search, sort, page, show, by) => {
		const token = this.props.auth.data.token;
		await this.props
			.dispatch(getBook(token, show, search, page, sort, by))
			.then((res) => {
				// console.log(res)
			})
			.catch((err) => {
				if (err.response.status === 401) {
					return this.props.history.push('/login');
				}
			});
	};

	getCategory = async () => {
		const token = this.props.auth.data.token;
		await this.props.dispatch(getGenre(token)).catch((err) => {
			if (err.response.status === 401) {
				return this.props.history.push('/login');
			}
		});
	};
	getAuthor = async () => {
		const token = this.props.auth.data.token;
		await this.props.dispatch(getAuthor(token)).catch((err) => {
			if (err.response.status === 401) {
				return this.props.history.push('/login');
			}
		});
	};

	handleParams = async (search, page) => {
		await this.getBook(
			search,
			this.getParams().get('sort'),
			page,
			this.getParams().get('show'),
			this.getParams().get('by')
		);
	};

	componentDidMount() {
		if (this.props.auth.data === null) {
			return this.props.history.push('/login');
		}
		this.handleParams();
		this.getCategory();
		this.getAuthor();
		if (this.props.auth.data.role === 'Admin') {
			return this.props.history.push('/dashboard');
		}
		// this.getImage()
	}

	componentDidUpdate() {}

	render() {
		return (
			<div>
				{this.props.auth.data !== null && (
					<Navbar data={this.handleParams} data_red={this.props.history} />
				)}
				{this.props.auth.data !== null && this.props.book.value && (
					<ListBook data={this.props.book} />
				)}
				{this.props.auth.data !== null && (
					<Pagination
						show={this.getParams().get('show') || 6}
						page={this.getParams().get('page')}
						qparams={this.handleParams}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
});

export default connect(mapStateToProps)(Home);
