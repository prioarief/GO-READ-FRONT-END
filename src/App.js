import React from 'react'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'
import ActivationPage from './pages/Activation.jsx'
import Logout from './pages/Logout.jsx'
import Home from './pages/Home'
import Detail from './pages/DetailBook'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/register' component={RegisterPage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/logout' component={Logout} />
				<Route path='/activation' component={ActivationPage} />
				<Route path='/detail/:book' component={Detail} />
				<Route path='/books' component={Home} />
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	)
}

export default App
