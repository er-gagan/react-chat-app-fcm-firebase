import React, { useState, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import { addToken } from '../../reducers/token';
import { useDispatch } from 'react-redux';
import firebase from '../../Credentials/Firebase/firebaseCredential';
import { notify } from '../../notify';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const logOut = useCallback(() => {
        localStorage.clear()
        // dispatch(deleteAllTodos([]))
        dispatch(addToken(null))
        history.push("/login");
        notify("error", "Something went wrong, Please check your internet and credentials and verify email!", 5000)
    }, [dispatch, history])

    const logIn = useCallback((token) => {
        localStorage.setItem("token", token)
        dispatch(addToken(token))
        history.push("/")
        notify("success", "You have successfully logged in", 5000)
    }, [dispatch, history])

    const submitBtn = async (e) => {
        e.preventDefault()
        console.log(email, password)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                if (user.user.emailVerified) {
                    user.user.getIdToken().then(idToken => {  // generate jwt
                        logIn(idToken)
                    }).catch(error => {
                        logOut()
                    })
                } else {
                    logOut()
                }
            }).catch(error => {
                logOut()
            })
        }
        catch (error) {
            logOut()
        }
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
