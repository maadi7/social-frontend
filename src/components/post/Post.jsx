import React, { useState, useEffect } from 'react';
import './post.css';
import axios from 'axios';
import { format } from "timeago.js";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {
    const navigate = useNavigate();
    let {username} = useParams();
    //console.log(post);
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLiked] = useState(post.likes.length);
    const [isLike, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() =>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[post.likes, currentUser._id])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user?userId=${post.userId}`);
            setUser(res.data);

        }
        fetchUser();
    }, [post.userId]);

    const handleVisit = async (id) =>{
        try {
            const res = await axios.get(`/user?userId=${id}`);
            navigate(`/profile/${res.data.username}`);
        } catch (error) {
            console.log(error);
        }


    }

    const handleDelete = async (id) =>{
        if (window.confirm("Are you sure! you wan't to delete this post?")){
        try {
              await axios.delete(`/post/${id}`, {data: {
                userId: currentUser._id,
             }});
             //console.log(res.data);
             window.location.reload();
             
        } catch (error) {
            console.log(error);
        }
    }
    }


    const LikeHandler = async () => {
        try{
            console.log(post);
            console.log(currentUser._id);
            await axios.put("/post/"+post._id+"/like", {userId: currentUser._id})
        }catch(err){
            
        }

        setLiked(isLike ? like - 1 : like + 1);
        setIsLiked(!isLike);
    }


    return (

<div className='post'>

    <div className="postWrapper">

        <div className="postTop">
            <div className="postTopContainer">
                {!username ?(

                <Link  to={`profile/${user.username}`} >
                    <img className='postTopImg' src={user.ProfilePicture ? PF + user.ProfilePicture : PF + "person/noAvatar.webp"} alt="" />
                </Link>
                ):(
                    <img className='postTopImg' src={user.ProfilePicture ? PF + user.ProfilePicture : PF + "person/noAvatar.webp"} alt="" />
                )}
                <div className="postTopInfo">
                    <span className="postTopInfoText">{user.username}</span>
                    <span className="postTopInfoText1">{format(post.createdAt)}</span>
                </div>
            </div>
            {/* {console.log(post._id)} */}
            {post.userId === currentUser._id ?(
                <button onClick={()=>{handleDelete(post._id)}} className='delete'>Delete</button>
            ):( !username &&
            <button className='visit' onClick={()=>{handleVisit(post.userId)}} >Visit Profile</button>
            )}
        </div>
        <div className="postCenter">
            <div className="postCenterText">{post?.desc}</div>
            <img src={post?.img} className='postCenterPost' alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img className='postBottomIcon' onClick={LikeHandler} src="/assets/heart.png" alt="" />
                <img className='postBottomIcon postBottomIcon1' onClick={LikeHandler} src="/assets/like.png" alt="" />
                <span className='postBottomLikeCount'>{like} people liked your post</span>
            </div>
        

        </div>
    </div>
</div>

    )
}

export default Post
