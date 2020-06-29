import React from 'react'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'
import Home from './pages/Home'
import Detail from './pages/DetailBook'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/register' component={RegisterPage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/detail' component={Detail} />
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	)
}

export default App
