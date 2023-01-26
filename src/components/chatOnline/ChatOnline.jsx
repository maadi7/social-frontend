import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() =>{
      const getFriends = async () =>{
        const res = await axios.get("https://iserver.onrender.com/api/user/friends/"+currentId);
        setFriends(res.data);
      }
      getFriends();
  },[currentId]);

  useEffect(() => {
    console.log(onlineUsers);
    console.log(friends);
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log(onlineFriends);
  

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `https://iserver.onrender.com/api/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) =>(

        <div className="chatOnlineFriend"  onClick={() => handleClick(o)} >
            <div className="chatOnlineImgContainer">
                <img src={o?.ProfilePicture ? o.ProfilePicture: PF + "person/noAvatar.webp"} className="chatOnlineImg"  alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineText">{o.username}</span>
        </div>
    ))}
      
    </div>
  )
}

export default ChatOnline
