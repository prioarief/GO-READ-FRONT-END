import React from 'react';
import { connect } from 'react-redux';
// import { getBook } from '../../redux/actions/book'
import style from '../../styles/dashboard/book.module.css';
import Author from '../dashboard/author/AuthorContent';
import Book from '../dashboard/book/BookContent';
import Genre from '../dashboard/genre/GenreContent';
const Content = (props) => {
	switch (props.menu) {
		case 'Author':
			return (
				<div>
					<Author data={props.data} />
				</div>
			);
		case 'Genre':
			return (
				<div>
					<Genre data={props.data} />
				</div>
			);
		case 'Book':
			return (
				<div>
					<Book data={props.data} />
				</div>
			);
		case 'Admin':
			return (
				<div>
					<h2 className={style.content_title}>Admin</h2>
				</div>
			);

		default:
			return (
				<div>
					<h2 className={style.content_title}>Dashboard</h2>
				</div>
			);
	}
};

const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	auth: state.auth,
});

// const mapDispatchToProps = { getBook }

export default connect(mapStateTopProps)(Content);
