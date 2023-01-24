import React from 'react';
import './leftbar.css';
import { Chat } from '@mui/icons-material';
import {Users} from '../../dummyData';
import CloseFriend from '../closefriend/CloseFriend';
import { useNavigate } from 'react-router-dom';

const Leftbar = () => {
  //const {user, currentChat, setCurrentChat} = useContext(AuthContext);
  
  const navigate = useNavigate();
  return (
    <div className="leftbar" >
    <div className="leftbarWrapper">
       <ul className="leftbarList">
        
        <li className="leftbarListItem">
          <Chat className='leftbarListItemIcon'/>
          <span className="leftbarListItemText" onClick={()=>navigate("/messenger")}>Chat</span>
        </li>
              
        
       </ul>
       
        <hr className="sidebarHr" />
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
    </div>
  </div>
  )
}

export default Leftbar
