import React from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { Logout as logout } from '../redux/actions/auth';
import { connect } from 'react-redux';

const Logout = (props) => {
	const handleLogout = async () => {
		await props.logout();
	};
	useEffect(() => {
		handleLogout();
		swal('Yahh!', 'Sesi Berakhir!', 'warning');
		localStorage.clear();
		props.history.push('/login');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div></div>;
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
