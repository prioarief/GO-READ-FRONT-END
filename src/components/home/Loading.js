import React from 'react';
import { Col, Spinner } from 'reactstrap';
import style from '../../styles/style.module.css'
const Loading = () => {
	return (
		<div>
			<Col md='12'>
				<Spinner
					className={style.login_spinner}
					type='grow'
					color='primary'
				/>{' '}
			</Col>
		</div>
	);
};

export default Loading;
