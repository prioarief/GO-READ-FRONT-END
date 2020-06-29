import React, {  } from 'react'
import style from '../styles/style.module.css'
const Auth = () => {
	return (
		<div>
			<h2 className={style.tagline}>
				Book is a window <br></br> to the world
			</h2>
			<p className={style.photo_by}>Photo by Mark Pan4ratte on Unsplash</p>
			<img src='./login.png' className={`${style.img_fluid} img-fluid`} alt='login' />
		</div>
	)
}

export default Auth
