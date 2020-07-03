import React from 'react'
import style from '../styles/book.module.css'
import moment from 'moment'
import {
	Button,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faShoppingCart,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios'

const Content = (props) => {
	console.log(props)
	const disable = props.data.returned_at === null ? true : false
	const date = moment(props.data.created_at).format('MMMM Do YYYY')
	
	
	const handleReturn = () => {
		const token = localStorage.getItem('token')
		Axios({
			method: 'GET',
			url: `http://localhost:3000/api/transaction/return/${props.data.id}`,
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				swal(`Book ${props.data.title} has been returned!`, {
					icon: 'success',
				})
				props.data_red.push('/history')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div>
			<Link to='/history' className={style.back}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
			<span className={style.category}>{props.data.genre}</span>
			<span className={style.title}>{props.data.title}</span>
			<span className={style.date}>{date}</span>
			<span className={style.status}>{(disable) ? 'Borrowed' : 'Returned'}</span>
			<span className={`${style.description}`}>{props.data.description}</span>
			
			{disable && <Button className={style.btn_borrow}>
				<span
					className={`text-decoration-none text-white`}
					onClick={handleReturn}
				>
					<FontAwesomeIcon icon={faShoppingCart} /> Returned
				</span>
			</Button> }

			
		</div>
	)
}

export default Content
