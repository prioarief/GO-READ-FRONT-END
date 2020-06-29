import React, { Component } from 'react'
import Slider from 'react-slick'

export default class SimpleSlider extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		}
		return (
			<div>
				<h2> Single Item</h2>
				<Slider {...settings}>
					<div>
						<h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis voluptatum quo libero, commodi delectus illum aliquam minima corrupti quos ipsam voluptates alias. Ducimus voluptatum voluptatibus molestias sunt repellendus. Quae, quaerat.</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Slider>
			</div>
		)
	}
}
