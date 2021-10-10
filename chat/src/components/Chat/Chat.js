import firebase from '../../Credentials/Firebase/firebaseCredential'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import React, { useState, useEffect, useRef } from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh';
import SimpleBar from 'simplebar-react';
import { notify } from '../../notify';
import 'simplebar/dist/simplebar.min.css';
import './Chat.css'

const Chat = () => {
  const [messageText, setMessageText] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

  const collectionRef = firebase.firestore().collection("chats")

  const [refresh, setRefresh] = useState(false)
  const [totalMsgLength, setTotalMsgLength] = useState(10)

  const query = collectionRef.orderBy('date').limitToLast(totalMsgLength)
  const [messages] = useCollectionData(query, { idField: 'id' });

  const query1 = collectionRef.orderBy('date')
  const [messages1] = useCollectionData(query1, { idField: 'id' });

  const messageRef = useRef(null)

  const scroll = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        { behavior: 'smooth', block: 'end', inline: 'nearest' }
      )
    }
  }

  useEffect(() => {
    if (messages && messages.length <= 10) {
      scroll()
    }
  }, [messages])

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

  const submitBtn = async (e) => {
    e.preventDefault()
    setTotalMsgLength(10)
    const MsgObj = {
      date: firebase.firestore.FieldValue.serverTimestamp(),
      email: email,
      username: username,
      msg: messageText
    }

    await collectionRef.add(MsgObj)
    setMessageText("")
    document.getElementById("messageInput").focus()
    scroll()
  }

  useEffect(() => {
    if (refresh) {
      const msgLength = messages1 && messages1.length
      if (totalMsgLength < msgLength) {
        if (totalMsgLength + 10 < msgLength) {
          setTotalMsgLength(totalMsgLength + 10)
        } else {
          setTotalMsgLength(msgLength)
        }
      } else {
        notify("info", "You have already fatched all messages", 3000)
      }
    }
    setRefresh(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  return (
    <div>
      <div className="container ">
        <SimpleBar style={{ maxHeight: 410, padding: "1%" }}>
          <PullToRefresh onRefresh={() => new Promise((resolve) => resolve(setRefresh(true)))}>
            {messages && messages.map((msg, i) => {
              return (
                <div key={i}>
                  {msg.email !== email ? <>
                    <div className="d-flex flex-row bd-highlight mb-3">
                      <div className="p-2 bd-highlight">
                        <div className="chat-log__item">
                          <h3 className="chat-log__author">{msg.username} <small>{String(new Date(msg.date && msg.date.seconds * 1000).toLocaleString('en-US', { hour: 'numeric', minute: "2-digit", hour12: true }))}</small></h3>
                          <div className="chat-log__message">{msg.msg}</div>
                        </div>
                      </div>
                    </div>
                  </> : <>
                    <div className="d-flex flex-row-reverse bd-highlight">
                      <div className="p-2 bd-highlight">
                        <div className="chat-log__item chat-log__item--own">
                          <h3 className="chat-log__author">{msg.username} <small>{String(new Date(msg.date && msg.date.seconds * 1000).toLocaleString('en-US', { hour: 'numeric', minute: "2-digit", hour12: true }))}</small></h3>
                          <div className="chat-log__message">{msg.msg}</div>
                        </div>

                      </div>
                    </div>
                  </>}
                </div>
              )
            })}
            <div ref={messageRef} >
            </div>
          </PullToRefresh>
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
