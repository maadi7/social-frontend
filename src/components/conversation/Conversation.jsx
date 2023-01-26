import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import "./conversation.css"

const Conversation = ({conversation, currentUser}) => {

  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  useEffect(() =>{

    const friendId = conversation.members.find((m) => m !== currentUser._id );
     
    const getUser = async () =>{
      try {
        const res = await axios("https://iserver.onrender.com/api/user?userId="+friendId);
        setUser(res.data);

      } 
      catch (error) {
        console.log(error);

      }
      
    }
    getUser();
  
  }, [currentUser, conversation])

  return (
    <div className="conversation">
        <img className="conversationImg" src={user?.ProfilePicture ? PF + user.ProfilePicture : PF + "person/noAvatar.webp"} alt="" />
        <span className="conversationText">{user?.username}</span>
    </div>
  )
}

export default Conversation
