import React from 'react';
import './closefriend.css'

const CloseFriend = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg" src={user?.ProfilePicture ? user.ProfilePicture: PF + "person/noAvatar.webp"} alt="" />
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}

export default CloseFriend
