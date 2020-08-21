import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from '../components/ContentDetailBook';
import Cover from '../components/CoverComponent';

class DetailBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			book: {},
			genres: [],
			authors: [],
		};
	}

	getDetailBook = async () => {
		const id = parseInt(this.props.match.params.book);
		const data = this.props.book.value;
		if (data.length > 0) {
			const filterData = data.filter((e) => {
				return e.id === id;
			});

			await this.setState({ book: filterData[0] });
		}
	};

	componentDidMount() {
		this.getDetailBook();
	}
	render() {
		return (
			<div>
				<Cover detail={this.state.book} />
				<Content data_red={this.props.history} detail={this.state.book} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
});

export default connect(mapStateToProps)(DetailBook);
