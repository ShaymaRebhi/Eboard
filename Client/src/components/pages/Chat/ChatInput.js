import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import {IconMdSend} from'react-icons/io'
import {BsEmojiSmile} from'react-icons/bs'
import {BsEmojiSmileFill} from'react-icons/bs'
import styled from 'styled-components';
import { IoMdSend } from "react-icons/io";
import { Button } from 'semantic-ui-react';

export default function ChatInput({ handleSendMsg }) {

const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const [values,setValues]=useState({
    msg:""
})
 

  return (
    <>
    <div>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input type="text" name="msg" onChange={(e) => setMsg(e.target.value)}  value={msg} placeholder="put your message here ..." ></input>
      </form>
      <button type='submit'>
        <IoMdSend />
      </button>
    </div>
    </>
  )
}
