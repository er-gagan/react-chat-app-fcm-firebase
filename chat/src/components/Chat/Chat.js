import React, { useState } from 'react';
import './Chat.css'

const Chat = () => {
    const [messageText, setMessageText] = useState("")

  const submitBtn = (e) => {
    e.preventDefault()
    // name, email, message, date
    console.log(messageText)
    console.log(Date())
    setMessageText("")
    document.getElementById("messageInput").focus()
  }

    return (
        <div>
      
      <div className="main">
        <div className="container ">
          <div className="chat-log">
            <div className="chat-log__item">
              <h3 className="chat-log__author">Felipe <small>14:30</small></h3>
              <div className="chat-log__message">Yo man</div>
            </div>
            <div className="chat-log__item chat-log__item--own">
              <h3 className="chat-log__author">Fabrício <small>14:30</small></h3>
              <div className="chat-log__message">BRB</div>
            </div>
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
    </div>
    )
}

export default Chat
