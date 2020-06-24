import React from 'react'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/register' component={RegisterPage} />
				<Route path='/login' component={LoginPage} />
			</Switch>
		</Router>
	)
}

export default App
