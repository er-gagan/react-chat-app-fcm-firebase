import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
    const [loginComponent, setLoginComponent] = useState(true)
    const [signupComponent, setSignupComponent] = useState(false)

    const handleSignup = () => {
        setSignupComponent(false)
        setLoginComponent(true)
    }
    const handleLogin = () => {
        setSignupComponent(true)
        setLoginComponent(false)
    }

    return (
        <div>
            <header className="page-header">
                <div className="container ">
                    <div className="d-flex bd-highlight">
                        <div className="flex-grow-1 bd-highlight h2">Gagan's WhatsApp</div>
                        {signupComponent && <>
                            <Link to="/signup" onClick={handleSignup} style={{ textDecoration: "none" }} className="link-light"> <div className="p-2 bd-highlight">Signup</div></Link>
                        </>}
                        {loginComponent && <>
                            <Link to="/login" onClick={handleLogin} style={{ textDecoration: "none" }} className="link-light"> <div className="p-2 bd-highlight">Login</div></Link>
                        </>}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
