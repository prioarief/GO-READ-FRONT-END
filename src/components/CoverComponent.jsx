import React from 'react'
import style from '../styles/book.module.css'

const Cover = (props) => {
	return (
		<div>
			<img src={`http://localhost:3000/images/${props.data.image}`} className={`${style.cover} img-fluid`} alt='' />
			<img src={`http://localhost:3000/images/${props.data.image}`} className={`${style.cover_full} img-fluid`} alt='' />
		</div>
	)
}

export default Cover
