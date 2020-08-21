/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Content from '../components/dashboard/Content';
import Sidebar from '../components/dashboard/SidebarComponent';
import Topbar from '../components/dashboard/TopbarComponent';

const Dashboard = (props) => {
	const [menu, setMenu] = useState('Dashboard');

	const switchMenu = (menu) => {
		setMenu(menu);
	};
	return (
		<div>
			<Topbar />
			<Sidebar menu={switchMenu} />
			<Content menu={menu} data={props.history} />
		</div>
	);
};

const mapStateTopProps = (state) => ({
	book: state.book,
	genre: state.genre,
	author: state.author,
	auth: state.auth,
});

// const mapDispatchToProps = { getBook, getAuthor, getGenre }

export default connect(mapStateTopProps)(Dashboard);
