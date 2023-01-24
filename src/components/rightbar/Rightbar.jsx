import React, { useContext } from 'react';
import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove, Send } from '@mui/icons-material';

const Rightbar = ({user}) => {
   
  const {user: currentUser, dispatch, setCurrentChat} = useContext(AuthContext);
  let {username} = useParams();
  const navigate = useNavigate();
 
  const Friendlist = ({user}) => {
  const [list, setList] = useState([]);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user._id));
 

    useEffect(() =>{
       const getFriends = async () =>{
        try{
          const friendlist = await axios.get("/user/friends/"+user._id);
          setList(friendlist.data);
          
        }
        catch(err){
          console.log(err);
        }
       }
       getFriends();
     },[user]);

     
     const handleClick = async () =>{
      try {
        if (followed) {
          await axios.put(`/user/${user._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(`/user/${user._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
        setFollowed(!followed);
        
      } catch (error) {
        //console.log(currentUser.username);
        console.log(error);
      }
      
     }
     const handleMessage = async () =>{
       try {
        const response = await axios.get(`/conversation/find/${currentUser._id}/${user._id}`);
       
        if(!response.data){
          const res = axios.post("/conversation", {
            senderId:currentUser._id, receiverId:user._id
          });
          navigate("/messenger");
          
          console.log(res.data);
          alert(`We are adding ${user.username} in your message list`)
        } 

        
        navigate("/messenger");
        
       } catch (error) {
           console.log(error);
       }

     }

     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   
  return (
    <>

      <div className="Friendlist">
      {user.username !== currentUser.username && (
        <div className='rightbarActions'>
        <button className="rightbarFollowButton"  onClick={handleClick} >
          {followed ? "Unfollow":"Follow"}
          {followed ?  <Remove/> : <Add/>}
        </button>
        <button onClick={handleMessage} className='rightbarMessage'>Message {user.username} {<Send/>}</button>
        </div>
      )}
        <div className="userInfo">
          <div className="userInfoContainer">
            <span className="userInfoKey">City:</span>
            <span className="userInfoValue">{user.city}</span>
          </div>
          <div className="userInfoContainer">
            <span className="userInfoKey">From:</span>
            <span className="userInfoValue">{user.from}</span>
          </div>
          <div className="userInfoContainer">
            <span className="userInfoKey">Relationship:</span>
            <span className="userInfoValue">{user.relationship === 1 ? "single":user.relationship === 2 ? "married":"-"}</span>
          </div>
        </div>
        {user.username === currentUser.username?
        <h4 className='FriendlistHeading'>Your Friend's List</h4>:
        <h4 className='FriendlistHeading' >{user.username} Friend's List</h4>
        }

        <div className="FriendlistContainer">
          {list.map((friend, i) =>(
          <div key={i} className="FriendlistItem">
            <Link to={`/profile/${friend.username}`} >
            <img className='FriendlistKey' src={friend.ProfilePicture ? PF+friend.ProfilePicture: PF+"person/noAvatar.webp"} alt="friend" />
            </Link>
            <span className='FriendlistValue' >{friend.username}</span>
          </div>
          ))}
        </div>
      </div>
    </>
  )
  }
  
const RightbarAd = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/*  */}
        <img src="assets/ad.png" className='rightbarAd' alt="" />
      </div>
      {/* <h4 className="rightbarTitle">Online Friends</h4>
      {Users.map((u) => (
        <Online user={u} key={u.id} />
      ))} */}

    </div>
  )

}


  return (
    <>

    {user ? <Friendlist user={user} /> : <RightbarAd/>}
    </>

  )
}

export default Rightbar


