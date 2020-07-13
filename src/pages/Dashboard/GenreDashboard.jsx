import React, { useEffect } from 'react'
import Sidebar from '../../components/dashboard/SidebarComponent'
import Topbar from '../../components/dashboard/TopbarComponent'
import Content from '../../components/dashboard/genre/GenreContent'
import { connect } from 'react-redux'
import { getGenre } from '../../redux/actions/genre'

const GenreDashboard = (props) => {
    console.log(props)
	useEffect(() => {
		props.getGenre(props.auth.data.token)
	},[])
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
	genre: state.genre,
})

const mapDispatchToProps = { getGenre }

export default connect(mapStateTopProps, mapDispatchToProps)(GenreDashboard)
