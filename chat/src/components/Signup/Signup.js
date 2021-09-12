import React, { useState } from 'react'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [email, setEmail] = useState("")

    const submitBtn = (e) => {
        e.preventDefault()
        console.log(username, password, confPassword, email)
    }
    return (
        <div>
            <div className="container my-2 m-auto">
                <form onSubmit={submitBtn}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={(e) => { setUsername(e.target.value !== " " ? e.target.value : "") }} value={username} autoFocus required id="name" placeholder="Type your name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input required type="email" className="form-control" onChange={(e) => setEmail(e.target.value !== " " ? e.target.value : "")} value={email} id="email" placeholder="name@example.com" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value !== " " ? e.target.value : "") }} value={password} required id="pwd" placeholder="Type a unique password" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confPwd" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={(e) => setConfPassword(e.target.value !== " " ? e.target.value : "")} value={confPassword} required id="confPwd" placeholder="Re-type password" />
                    </div>

                    <div className="text-center">
                        <input type="submit" value="Submit" className="btn btn-success btn-sm" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
