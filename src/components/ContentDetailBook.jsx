import React from 'react'
import style from '../styles/book.module.css'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faArrowLeft, faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Content = (props) => {
	return (
		<div>
            <a href='/' className={style.back}><FontAwesomeIcon icon={faArrowLeft} /></a>
            <a href='/' className={style.edit}><FontAwesomeIcon icon={faPenAlt} /> Edit</a>
            <a href='/' className={style.delete}><FontAwesomeIcon icon={faTrashAlt} /> Delete</a>
			<span className={style.category}>Novel</span>
			<span className={style.title}>Dilan 1990</span>
			<span className={style.date}>30 Juni 2019</span>
			<span className={style.status}>Available</span>
			<span className={`${style.description}`}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam
				eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus
				egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor
				auctor consequat. Donec semper magna erat, sed fringilla lacus pretium
				eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit
				accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet
				libero sed orci ullamcorper efficitur. Pellentesque in euismod purus,
				sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id,
				tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend
				odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan
				facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis
				rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae
				lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non
				nulla ut ante imperdiet euismod quis nec massa.
			</span>
            <Button className={style.btn_borrow}><FontAwesomeIcon icon={faShoppingCart} /> Borrow</Button>
		</div>
	)
}

export default Content
