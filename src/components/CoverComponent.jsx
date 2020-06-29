import React from 'react'
import style from '../styles/book.module.css'

const Cover = (props) => {
	return (
		<div>
			<img src='./covernya.png' className={`${style.cover} img-fluid`} alt='' />
			<img src='./dilan.jpg' className={`${style.cover_full} img-fluid`} alt='' />
		</div>
	)
}

export default Cover
