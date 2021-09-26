import firebase from '../../Credentials/Firebase/firebaseCredential'
import React, { useState, useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './Chat.css'

const Chat = () => {
  const [messageText, setMessageText] = useState("")
  const [allMsg, setAllMsg] = useState([])
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

  const messageRef = useRef(null)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        { behavior: 'smooth', block: 'end', inline: 'nearest' }
      )
    }
  })

  useEffect(() => {
    // get user data
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email)
        setUsername(user.displayName)
      } else {
        return console.log("Something went wrong")
      }
    })
  }, [])

  const displayChats = () => {
    const chatArray = []
    firebase.firestore().collection("chats").orderBy("date", "asc").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        chatArray.push(doc.data())
      })
      setAllMsg(chatArray)
    })
  }

  // get chats data
  useEffect(() => {
    displayChats()
  }, [])


  const submitBtn = (e) => {
    e.preventDefault()
    const MsgObj = {
      date: new Date(),
      email: email,
      username: username,
      msg: messageText
    }
    
    firebase.firestore().collection("chats").add(MsgObj)
    setMessageText("")
    document.getElementById("messageInput").focus()
    displayChats()
  }

  return (
    <div>
      {/* <div className="main"> */}
      <div className="container ">
        <SimpleBar style={{ maxHeight: 450, padding: "10px" }}>
          <div>
            {allMsg.length > 0 ? allMsg.map((msg, i) => {
              return (<div key={i}>
                {msg.email !== email ? <>
                  <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                      <div className="chat-log__item">
                        <h3 className="chat-log__author">{msg.username} <small>03:40</small></h3>
                        <div className="chat-log__message">{msg.msg}</div>
                      </div>

                    </div>
                  </div>
                </> : <>
                  <div className="d-flex flex-row-reverse bd-highlight">
                    <div className="p-2 bd-highlight">
                      <div className="chat-log__item chat-log__item--own">
                        <h3 className="chat-log__author">{msg.username} <small>03:40</small></h3>
                        <div className="chat-log__message">{msg.msg}</div>
                      </div>

                    </div>
                  </div>
                </>}
              </div>)
            }) : ""}
          </div>
          <div ref={messageRef} >
          </div>
        </SimpleBar>
      </div>
      <div className="chat-form">
        <div className="container ">
          <form className="form-horizontal" onSubmit={submitBtn}>
            <div className="row">
              <div className="col-sm-10 col-xs-8">
                <input type="text" className="form-control" id="messageInput" value={messageText} onChange={(e) => setMessageText(e.target.value !== " " ? e.target.value : "")} placeholder="Message" required autoFocus />
              </div>
              <div className="col-sm-2 col-xs-4">
                <button type="submit" className="btn btn-success btn-block">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default Chat
