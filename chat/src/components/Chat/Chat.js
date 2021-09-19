import firebase from '../../Credentials/Firebase/firebaseCredential'
import React, { useState, useEffect } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './Chat.css'
import ScrollableFeed from 'react-scrollable-feed'


const Chat = () => {
  const [messageText, setMessageText] = useState("")
  const [allMsg, setAllMsg] = useState([])
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

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

  const sc = () => {
    document.getElementById("msgBox").scrollTop = document.getElementById("msgBox").scrollHeight
  }

  const submitBtn = (e) => {
    e.preventDefault()
    firebase.firestore().collection("chats").add({
      date: new Date(),
      email: email,
      username: username,
      msg: messageText
    })
    setMessageText("")
    document.getElementById("messageInput").focus()

    displayChats()
    sc()
  }

  return (
    <div>
      {/* <div className="main"> */}
      <div className="container ">
        <div id="msgBox">
          <SimpleBar style={{ maxHeight: 450, padding: "10px" }}>
          <ScrollableFeed forceScroll={true}>
          {allMsg.length > 0 ? allMsg.map((msg, i) => {
            return (<div key={i}>
              {msg.email !== email ? <>
                <div className="chat-log__item">
                  <h3 className="chat-log__author">{msg.username} <small>03:40</small></h3>
                  <div className="chat-log__message">{msg.msg}</div>
                </div>
              </> : <>
                <div className="chat-log__item chat-log__item--own">
                  <h3 className="chat-log__author">{msg.username} <small>03:40</small></h3>
                  <div className="chat-log__message">{msg.msg}</div>
                </div>
              </>}
            </div>)
          }) : ""}

          </ScrollableFeed>
          </SimpleBar>
        </div>
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
