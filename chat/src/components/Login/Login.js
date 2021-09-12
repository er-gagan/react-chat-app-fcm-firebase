import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitBtn = (e) => {
        e.preventDefault()
        console.log(email, password)
    }
    return (
        <div>
            <div className="container my-2 m-auto">
                <form onSubmit={submitBtn}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input required type="email" className="form-control" onChange={(e) => setEmail(e.target.value !== " " ? e.target.value : "")} value={email} id="email" placeholder="name@example.com" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value !== " " ? e.target.value : "") }} value={password} required id="pwd" placeholder="Type password" />
                    </div>

                    <div className="text-center">
                        <input type="submit" value="Login" className="btn btn-success btn-sm" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
