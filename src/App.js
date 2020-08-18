import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ActivationPage from './pages/Activation.jsx';
import Dashboard from './pages/Dashboard';
import Detail from './pages/DetailBook';
import Home from './pages/Home';
import LoginPage from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import RegisterPage from './pages/Register.jsx';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/register' component={RegisterPage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/logout' component={Logout} />
				<Route path='/activation' component={ActivationPage} />
				<Route path='/detail/:book' component={Detail} />
				<Route path='/books' component={Home} />
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
