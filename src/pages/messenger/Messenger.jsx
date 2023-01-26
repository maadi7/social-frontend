import "./messenger.css";
import Topbar from '../../components/topbar/Topbar';
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useRef } from "react";
import axios from "axios";
import {io} from "socket.io-client";


const Messenger = () => {
  
   const {user} = useContext(AuthContext);
   const [conversation, setConversation] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessages, setNewMessages] = useState("");
   const [onlineUsers, setOnlineUsers] = useState();
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const socket = useRef();
   const scrollRef = useRef();
    
   useEffect(() =>{
     socket.current = io("https://social-socket.onrender.com");
     socket.current.on("getMessage", (data)=>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
     })
   },[]);
   useEffect(() =>{
     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev=>[...prev, arrivalMessage])
   },[arrivalMessage, currentChat])

   useEffect(() =>{
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users =>{
      setOnlineUsers( user.followings.filter((f) => users.some((u) => u.userId === f)));
    })
   },[user])
   console.log(user);
   

   useEffect(() =>{
      const getConversation = async () =>{
        try{
          const res = await axios.get("https://iserver.onrender.com/api/conversation/"+user._id);
          setConversation(res.data);
        }catch(err){
          console.log(err);
        }
      }
      getConversation();
   },[user._id]);


   useEffect(() =>{
    const getMessage = async () =>{
      try {
        const res = await axios.get("https://iserver.onrender.com/api/message/"+currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
      
    }
    getMessage();
   }, [currentChat]);
   //console.log(user._id);
   const handleClick = async (e) =>{
        e.preventDefault();

        const receiverId = currentChat.members.find(
        (member) => member !== user._id);
    
        socket.current.emit("sendMessage",{
          senderId: user._id,
          receiverId,
          text: newMessages
        })

        const message = {
          sender: user._id,
          text: newMessages,
          conversationId: currentChat._id
        }
        try {
          const res = await axios.post("https://iserver.onrender.com/api/message", message);
          setMessages([...messages, res.data]);
          setNewMessages("");
        } catch (error) {
          console.log(error);
        }
   };

   useEffect(() =>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
   },[messages])
   const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <>
    <Topbar/>
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input 
          placeholder="Search friends" 
          className="chatMenuInput"
          type="text"
          />
          
          {conversation.slice(0).reverse().map((c, index)=>(
            <div key={index}  onClick={() => setCurrentChat(c)} >
              <Conversation conversation={c} currentUser={user} />
            </div>

          ))}
        </div>  
      </div>  
      <div className="chatBox">
        <div className="chatBoxWrapper">
          { currentChat ? (
            <>
            <div className="chatBoxTop">
              {console.log(messages)}
              {messages.map((m) =>(
                <div ref={scrollRef}>
                <Message message={m} own={m.sender === user._id} user={user} />
                </div>
              ))}
              
          
            </div>
            <div className="chatBoxBottom">
               <textarea placeholder="Message" onChange={(e) =>{setNewMessages(e.target.value)}}
                value={newMessages} className="chatMessageInput"></textarea> 
               <button className="chatSubmitButton" onClick={handleClick} >Send</button>
            </div>  
            </>)
            :
            <span className="noChatText" >Start the conversation..... </span>  }
        </div>  
              
      </div>  
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
           <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />  
        </div>   
      </div>  
    </div>
    </>
  )
}

export default Messenger
