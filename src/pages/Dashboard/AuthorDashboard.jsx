import React, { useEffect } from 'react'
import Sidebar from '../../components/dashboard/SidebarComponent'
import Topbar from '../../components/dashboard/TopbarComponent'
import Content from '../../components/dashboard/author/AuthorContent'
import { connect } from 'react-redux'
import { getAuthor } from '../../redux/actions/author'

const AuthorDashboard = (props) => {
    console.log(props)
	useEffect(() => {
		props.getAuthor(props.auth.data.token)
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
	author: state.author,
})

const mapDispatchToProps = { getAuthor }

export default connect(mapStateTopProps, mapDispatchToProps)(AuthorDashboard)
