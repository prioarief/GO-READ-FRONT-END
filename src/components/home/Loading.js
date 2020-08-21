import React from 'react';
import { Spinner } from 'reactstrap';
const Loading = () => {
	return (
		<div>
			<Spinner type='grow' color='primary' className='loading' />{' '}
		</div>
	);
};

export default Loading;
