import React, { useEffect } from 'react'
import Sidebar from '../components/dashboard/SidebarComponent'
import Topbar from '../components/dashboard/TopbarComponent'
import Content from '../components/dashboard/Content'
import { connect } from 'react-redux'
import { getBook } from '../redux/actions/book'
import { getGenre } from '../redux/actions/genre'
import { getAuthor } from '../redux/actions/author'
import { useState } from 'react'

const Dashboard = (props) => {
	const [menu, setMenu] = useState('Dashboard')

	const switchMenu = (menu) => {
		setMenu(menu)
	}

	const Author = (token) => {
		props.dispatch(getAuthor(token))
	}
	const Genre = (token) => {
		props.dispatch(getGenre(token))
	}
	const Book = (token) => {
		props.dispatch(getBook(token))
	}

	useEffect(() => {
		Author(props.auth.data.token)
		Book(props.auth.data.token)
		Genre(props.auth.data.token)
	}, [])
	return (
		<div>
			<Topbar />
			<Sidebar menu={switchMenu} />
			<Content menu={menu} data={props.history} />
		</div>
	)
}

const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	author: state.author,
	auth: state.auth,
})

// const mapDispatchToProps = { getBook, getAuthor, getGenre }

export default connect(mapStateTopProps)(Dashboard)
