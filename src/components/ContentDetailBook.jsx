import React, { Component } from 'react'
import style from '../styles/book.module.css'
import moment from 'moment'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faShoppingCart,
	faArrowLeft,
	faPenAlt,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Content = (props) => {
	const disable = props.data.status === 'Borrowed' ? true : false
	const date = moment(props.data.created_at).format('MMMM Do YYYY')
	return (
		<div>
			<Link to='/' className={style.back}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
			<a href='/' className={style.edit}>
				<FontAwesomeIcon icon={faPenAlt} /> Edit
			</a>
			<a href='/' className={style.delete}>
				<FontAwesomeIcon icon={faTrashAlt} /> Delete
			</a>
			<span className={style.category}>{props.data.genre}</span>
			<span className={style.title}>{props.data.title}</span>
			<span className={style.date}>{date}</span>
			<span className={style.status}>{props.data.status}</span>
			<span className={`${style.description}`}>{props.data.description}</span>
			<Button className={style.btn_borrow} disabled={disable}>
				<FontAwesomeIcon icon={faShoppingCart} /> Borrow
			</Button>
		</div>
	)
}

// class Content extends Component{
// 	constructor(props){
// 		super(props)
// 		console.log(props)
// 	}
// 	render(){
// 		return(
// 			<div>
// 				<p>{this.props}</p>
// 			</div>
// 		)
// 	}
// }

export default Content
