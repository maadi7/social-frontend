import React,{useState} from 'react';
import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from "axios";
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

 
const Feed = ({username}) => {
   const [posts, setPosts] = useState([]);
   const {user} = useContext(AuthContext);

  useEffect(() =>{
    const fetchPost = async () =>{
         const res = username ? await axios.get("/post/profile/"+username) :
          await axios.get("post/timeline/"+user._id);
       
          setPosts(
            res.data.sort((p1, p2) =>{
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            );

    }
    fetchPost();
  },[username, user._id]);
  return (
    <div className='feed'>
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share/>}
      {posts.map((p)=>(
        <Post post={p} key={p._id} />
      ))}
      </div>
    </div>
  )
}

export default Feed
