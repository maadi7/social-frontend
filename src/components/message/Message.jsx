import "./message.css";
import {format} from "timeago.js"
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Message = ({message, own, user}) => {
   const [sender, setSender] = useState({});
   //const [receiver, setReceiver] = useState({});
  useEffect(()=>{
    const getSender = async () =>{
      try {
        console.log(message);
        const res = await axios.get("/user?userId="+message?.sender);
        setSender(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    }
    getSender();

  },[message])
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own": "message"}>
       
        <div className="messageTop">
          {/* <img className="messageImg" src="/assets/person/1.jpeg" alt="" /> */}
          
            <div className="messageMid" >
            <span className="messageSender">{sender.username}</span>
            <img className="messageImg" src={sender.ProfilePicture ? PF + sender.ProfilePicture: PF + "person/noAvatar.webp"}   alt="" />
            
            </div>
            <span className="messageText">{message.text}</span>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message
