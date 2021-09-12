import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import firebase from '../../Credentials/Firebase/firebaseCredential';
import { addToken } from '../../reducers/token';
import { notify } from '../../notify';
import './Navbar.css'
const Navbar = () => {
    const token = useSelector(state => state.token.data)
    const dispatch = useDispatch()
    const history = useHistory();
    const [loginComponent, setLoginComponent] = useState(false)
    const [signupComponent, setSignupComponent] = useState(true)

    const handleSignup = () => {
        setSignupComponent(false)
        setLoginComponent(true)
    }
    const handleLogin = () => {
        setSignupComponent(true)
        setLoginComponent(false)
    }

    const logOut = () => {
        firebase.auth().signOut().then(() => {
            localStorage.clear()
            dispatch(addToken(null))
            history.push("/login");
            notify("success", "Successfully logged out!", 3000)
        }).catch((error) => {
            notify("error", `${error.message}, You haven't signout!`, 4000)
        })
        handleLogin()
    }

    return (
        <div>
            <header className="page-header">
                <div className="container ">
                    <div className="d-flex bd-highlight">
                        <div className="flex-grow-1 bd-highlight h2">Gagan's WhatsApp</div>
                        {token ? <>
                            <Link to="/login" onClick={logOut} style={{ textDecoration: "none" }} className="link-light"> <div className="p-2 bd-highlight">Logout</div></Link>
                        </> : <>
                            {signupComponent && <>
                                <Link to="/signup" onClick={handleSignup} style={{ textDecoration: "none" }} className="link-light"> <div className="p-2 bd-highlight">Signup</div></Link>
                            </>}
                            {loginComponent && <>
                                <Link to="/login" onClick={handleLogin} style={{ textDecoration: "none" }} className="link-light"> <div className="p-2 bd-highlight">Login</div></Link>
                            </>}</>}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
