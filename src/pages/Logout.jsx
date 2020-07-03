import React, {  } from 'react'
import { useEffect } from 'react'
import swal from 'sweetalert'
// import AuthComponent from '../components/AuthComponent'
// import LoginComponent from '../components/LoginComponent'
// import { Col, Row } from 'reactstrap'

const Logout = (props) => {
    // console.log(props.history.push)
    // const setLogout = () => {
        
    // }
    useEffect(() => {
        swal('Yahh!', 'Sesi Berakhir!', 'warning')
        localStorage.clear()
        props.history.push('/login')
    })

    return(
        <div></div>
    )
}

export default Logout
