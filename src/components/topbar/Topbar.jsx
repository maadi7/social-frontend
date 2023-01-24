import React, { useEffect, useState } from 'react'
import './topbar.css';
import {Search, Menu} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Chat } from '@mui/icons-material';
import {AuthContext} from '../../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import Leftbar from "../leftbar/Leftbar"

const Topbar = () => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const d = [];
  const navigate = useNavigate();
 
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  
  useEffect(()=>{
    const getAllUser = async () =>{
    try {
      const res = await axios.get("/user/all");
      res.data.map((value)=>{
        d.push(value.username);
      });
      setFilterData(d);
    } catch (error) {
      console.log(error);
    }
  }
  getAllUser();


},[])

const getProfile = async (val) =>{
  
  if(val === "") return;
  try {
    const res = await axios.get("/user?username="+val);
    if(res.data){
      navigate(`/profile/${val}`);
    }else{
      alert(`No user with username ${val}`);
    }
  } catch (error) {
    console.log(error);
    
  }
  setSearchTerm("");

}


  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <Menu onClick={()=>setToggle(!toggle)} className="toggle1" />
          <Link to="/" style={{ textDecoration: "none" }} >
          <span className='topbarLogo'>Social</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <input           
          type="text"
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder='Search accounts, posts, images etc ' 
          className="topbarInput" />
          <Search onClick={()=>getProfile(searchTerm)} className='topbarSearchIcon' />
          {searchTerm.length != 0 && filterData.length != 0 && (
          <div>
          {filterData.filter((val)=>{
            if(searchTerm === ""){
              return val;
            }else if(val.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }
          }).map((value, key) => {
            return (
              <div className="dataResult" key={key}>
              <a onClick={()=>getProfile(value)} className="dataItem" target="_blank">
                <p>{value} </p>
              </a>
              </div>
            );
          })}
        </div>
      )}
        </div>
        <div className="topbarRight">
          <div className="topbarRightLinks">
            <div className="topbarLinks" onClick={()=>navigate("/")}>Homepage</div>
            <div className="topbarLinks">Timeline</div>
          </div>
          
        <Link to={`/profile/${user?.username}`} >
        <img src={user?.ProfilePicture ? PF + user.ProfilePicture : PF + "person/noAvatar.webp"} alt="" className="topbarImg"/>
        </Link>
        </div>
        </div>

    {toggle &&
    (
      
      <div className='toggler'>
        {/* <Menu onClick={()=>setToggle(!toggle)} className="toggle"/> */}
        <div className="toggletopbarRight">
          <div className="toggletopbarRightLinks">
            <Link to={`/profile/${user?.username}`} >
             <img src={user?.ProfilePicture ? PF + user.ProfilePicture : PF + "person/noAvatar.webp"} alt="" className="toggletopbarImg"/>
            </Link>
            <div className="topbarLinks" onClick={()=>navigate("/")}>Homepage</div>
          </div>
          
          <ul className="leftbarList">
          <hr className="sidebarHr" />
        <li className="leftbarListItem">
   
          <Chat className='toggleleftbarListItemIcon'/>
          <span className="toggleleftbarListItemText" onClick={()=>navigate("/messenger")}>Chat</span>
        </li>
              
        
       </ul>
       
        <hr className="sidebarHr" />
         </div>
        
      </div>
    )}
    </div>
   
  )
}

export default Topbar
