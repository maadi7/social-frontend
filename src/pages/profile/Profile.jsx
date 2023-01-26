import React, { useState, useEffect } from 'react';
import './profile.css';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';
import { useParams } from 'react-router';

const Profile = () => {

    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://iserver.onrender.com/api/user?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);
    return (
        <>
            <Topbar />
            <div className='profileContainer' >
                <Leftbar />
                <div className='profileRight'>
                    <div className="profileRightTop">
                        <img src={user.CoverPicture  ?  user.CoverPicture : PF + "person/default.jpg"}
                            className='profileCoverPicture' alt="" />
                        <img src={
                            user.ProfilePicture ?  user.ProfilePicture : PF + "person/noAvatar.webp"}
                         className='profilePicture' alt="" />
                         

                    </div>
                    <div className="profileRightBottom">
                        <span className="username">{user.username}</span>
                        <span className="desc">{user.desc}</span>
                    </div>


                    <div className="profileBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile
