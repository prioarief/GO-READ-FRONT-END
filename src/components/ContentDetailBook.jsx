import React from 'react'
import style from '../styles/book.module.css'
import moment from 'moment'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Borrow } from '../redux/actions/transaction'

const Content = (props) => {
	const disable = props.book.detail[0].status === 'Borrowed' ? true : false
	const date = moment(props.book.detail[0].created_at).format('DD MMMM YYYY')
	console.log(props)
	const handleBorrow = () => {
		const token = props.auth.data.token
		props
			.dispatch(Borrow(token, props.book.detail[0].id))
			.then((res) => {
				swal(`Book ${props.book.detail[0].title} has been borrowed!`, {
					icon: 'success',
				})
				props.data_red.push('/books')
			})
			.catch((err) => {
				console.log(err)
			})
		// Axios({
		// 	method: 'GET',
		// 	url: `http://localhost:3000/api/transaction/borrow/${props.book.detail[0].id}`,
		// 	headers: {
		// 		Authorization: token,
		// 	},
		// })
	}

	return (
		<div style={{ overflow: 'hidden' }}>
			<Link to='/' className={style.back}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>

			<span className={style.category}>{props.book.detail[0].genre}</span>
			<span className={style.title}>{props.book.detail[0].title}</span>
			<span className={style.date}>{date}</span>
			<span className={style.status}>{props.book.detail[0].status}</span>
			<span className={`${style.description}`}>
				{props.book.detail[0].description}
			</span>
			<Button className={style.btn_borrow} disabled={disable}>
				<span
					to={`/borrow/${props.book.detail[0].id}`}
					className={`text-decoration-none text-white`}
					onClick={handleBorrow}
				>
					<FontAwesomeIcon icon={faShoppingCart} /> Borrow
				</span>
			</Button>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
})

export default connect(mapStateToProps)(Content)
