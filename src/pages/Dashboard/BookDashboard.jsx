import React, { useEffect } from 'react'
import Sidebar from '../../components/dashboard/SidebarComponent'
import Topbar from '../../components/dashboard/TopbarComponent'
import Content from '../../components/dashboard/book/BookContent'
import { connect } from 'react-redux'
import { getAuthor } from '../../redux/actions/author'
import { getGenre } from '../../redux/actions/genre'
import { getBook } from '../../redux/actions/book'
const BookDashboard = (props) => {
	useEffect(() => {
		props.getBook(props.auth.data.token	)
		// props.getBook(props.auth.data.token	)
		// props.getAuthor(props.auth.data.token	)
	}, [])
	return (
		<div>
			<Topbar />
			<Sidebar />
			<Content data={props.history} />
		</div>
	)
}



const mapStateTopProps = (state) => ({
	auth: state.auth,
	author: state.author,
	book: state.book,
	genre: state.genre,
})

const mapDispatchToProps = { getBook, getGenre, getAuthor }

export default connect(mapStateTopProps, mapDispatchToProps)(BookDashboard)
