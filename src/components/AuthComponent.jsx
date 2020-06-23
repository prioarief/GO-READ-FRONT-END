import React, { Component } from 'react'

class Auth extends Component {
	render() {
		return (
			<div>
				<h2 className='tagline'>
					Book is a window <br></br> to the world
				</h2>
				<p className='photo-by text-sm'>Photo by Mark Pan4ratte on Unsplash</p>
				<img src='./login.png' className='img-fluid' alt='login' />
			</div>
		)
	}
}

export default Auth
