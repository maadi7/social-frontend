import React from 'react';
import {PermMedia, Label, LocationOn, EmojiEmotions, Cancel} from "@mui/icons-material"
import './share.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase/firebase';
import axios from "axios";
import { useEffect } from 'react';

const Share = () => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [urlAddress, setUrlAddress] = useState(null);
  const [progress, setProgress] = useState(0);
  // const desc = useRef();
  const [desc, setDesc] = useState("");
  const handleSumbit = async (e) =>{
    e.preventDefault();
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(progress);
      },
      error =>{
        console.log("err");
      },
      () =>{
        storage 
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url =>{
            setUrlAddress(url);
          })
      }
    );

  }
  useEffect(() =>{
    const upload = async () =>{
      if(urlAddress === null) return;
      console.log(urlAddress);
      const newPost = {
        userId: user._id,
        desc: desc,
        img: urlAddress
      } 
      try {
         await axios.post("https://iserver.onrender.com/api/post", newPost);
        console.log("posted");
        // setTimeout(()=>)
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    upload();
  },[setUrlAddress, urlAddress, desc])


  return (

    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img src={user.ProfilePicture ? PF + user.ProfilePicture : PF + "person/noAvatar.webp"} className='shareTopImg' alt="" />
             {progress === 0 || progress !== 100 && <progress value={progress} max="100"/>}
            <input onChange={(e) => setDesc(e.target.value)} placeholder={"What's in your mind "+ user.username + "?"} className="shareTopInput" />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer' >
            <img className='shareImg' src={URL.createObjectURL(file)} alt="post" />
            <Cancel className='shareCancelImg' onClick={()=> setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSumbit}  >
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareOptionIcon' />
                    <span className='shareOptionText' >Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) =>setFile(e.target.files[0])}  />
                </label>
                {/* <div className="shareOption">
                    <Label htmlColor='blue' className='shareOptionIcon' />
                    <span className='shareOptionText' >Tag</span>
                </div>
                <div className="shareOption">
                    <LocationOn htmlColor='green' className='shareOptionIcon' />
                    <span className='shareOptionText' >Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor='gold' className='shareOptionIcon' />
                    <span className='shareOptionText' >Feelings</span>
                </div> */}
            </div>
            <button  className="shareBottomButton" type='sumbit' >Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
