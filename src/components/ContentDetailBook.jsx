import React from 'react';
import style from '../styles/book.module.css';
import moment from 'moment';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Borrow } from '../redux/actions/transaction';

const Content = (props) => {
	const book = props.detail;
	const disable = book.status === 'Borrowed' ? true : false;
	const date = moment(book.created_at).format('DD MMMM YYYY');
	const handleBorrow = () => {
		const token = props.auth.data.token;
		props
			.dispatch(Borrow(token, book.id))
			.then((res) => {
				swal(`Book ${book.title} has been borrowed!`, {
					icon: 'success',
				});
				props.data_red.push('/books');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div style={{ overflow: 'hidden' }}>
			<Link to='/' className={style.back}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>

			<span className={style.category}>{book.genre}</span>
			<span className={style.title}>{book.title}</span>
			<span className={style.date}>{date}</span>
			<span className={style.status}>{book.status}</span>
			<span className={`${style.description}`}>{book.description}</span>
			<Button className={style.btn_borrow} disabled={disable}>
				<span
					className={`text-decoration-none text-white`}
					onClick={handleBorrow}
				>
					<FontAwesomeIcon icon={faShoppingCart} /> Borrow
				</span>
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
});

export default connect(mapStateToProps)(Content);
