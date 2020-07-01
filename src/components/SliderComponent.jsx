import React, { useState } from 'react'
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
	CarouselCaption,
} from 'reactstrap'
import style from '../styles/book.module.css'

const SliderComponent = (props) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [animating, setAnimating] = useState(false)

	let items = props.data.map((item) => {
		return(
			{
				src : `http://localhost:3000/images/${item.image}`,
				classNames : style.carousell,
				altText : item.title,
				caption : item.title,
			}
		)
	})

	const next = () => {
		if (animating) return
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
		setActiveIndex(nextIndex)
	}

	const previous = () => {
		if (animating) return
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
		setActiveIndex(nextIndex)
	}

	const goToIndex = (newIndex) => {
		if (animating) return
		setActiveIndex(newIndex)
	}

	const slides = items.map((item) => {
		return (
			<CarouselItem
				onExiting={() => setAnimating(true)}
				onExited={() => setAnimating(false)}
				key={item.src}
			>
				<img src={item.src} alt={item.altText} className={item.classNames} />
				<CarouselCaption
					captionText={item.caption}
					captionHeader={item.caption}
				/>
			</CarouselItem>
		)
	})

	return (
		<Carousel activeIndex={activeIndex} next={next} previous={previous}>
			<CarouselIndicators
				items={items}
				activeIndex={activeIndex}
				onClickHandler={goToIndex}
			/>
			{slides}
			<CarouselControl
				direction='prev'
				directionText='Previous'
				onClickHandler={previous}
			/>
			<CarouselControl
				direction='next'
				directionText='Next'
				onClickHandler={next}
			/>
		</Carousel>
	)
}

export default SliderComponent
