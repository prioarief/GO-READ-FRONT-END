import React from 'react'
import style from '../styles/book.module.css'
import { connect } from 'react-redux'

const Cover = (props) => {
	console.log(props)
	return (
		<div>
			<img src={`${process.env.REACT_APP_API_URL}/images/${props.detail.image}`} className={`${style.cover} img-fluid`} alt='' />
			<img src={`${process.env.REACT_APP_API_URL}/images/${props.detail.image}`} className={`${style.cover_full} img-fluid`} alt='' />
		</div>
	)
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	book: state.book,
})

export default connect(mapStateToProps)(Cover)
