import React from 'react';
import './online.css';

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <ul className="rightbarFriendList">
    <li className="rightbarFriend">
      <div className="rightbarImageContainer">
            <img className='rightbarFriendImg' src={PF+user.profilePicture} alt="" />
            <span className="rightbarBadge"></span>
      </div>
      <span className='rightbarFriendName' >{user.username}</span>
    </li>
  </ul>
  )
}

export default Online
