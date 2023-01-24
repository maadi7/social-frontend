import React,{useRef, useState, useEffect} from 'react';
import './register.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase/firebase';



const Register = () => {

  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [urlAddress, setUrlAddress] = useState(null);
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null); 
  const navigate = useNavigate();

   const handleSumbit = async (e) => {
   e.preventDefault();
    const uploadTask = storage.ref(`images/${file1.name}`).put(file1);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      error =>{
        console.log("err");
      },
      () =>{
        storage 
          .ref("images")
          .child(file1.name)
          .getDownloadURL()
          .then(url =>{
            setProfile(url);
            console.log(url);
          })
      }

    );

    const uploadTask2 = storage.ref(`images/${file2.name}`).put(file2);
    uploadTask2.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      error =>{
        console.log("err");
      },
      () =>{
        storage 
          .ref("images")
          .child(file2.name)
          .getDownloadURL()
          .then(url =>{
             setCover(url);
          })
      }
    );

    //handleClick();
   }

  useEffect(()=>{

    const handleClick = async () =>{
      if(cover == null || profile == null){
        alert("select profile and cover")
        return;
      } 
      //e.preventDefault();
      //if(password.current.value === "") return;
       if(password.current.value !== passwordAgain.current.value){
        alert("Password didn't match")
        passwordAgain.current.setCustomValidity("password don't match")
       }
       else{
        console.log(cover);
        console.log(profile);
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
          ProfilePicture: profile,
          CoverPicture: cover,
        };
        try {
          const res = await axios.post("/auth/register", user);
          console.log(res.data.username);
          if(res.data.username){
            navigate("/login");
            alert("you can login now")
          }
          
        } catch (error) {
          alert("wrong email or password");
          console.log(error);
        }
  
       }
       
    }

    handleClick();

  },[setCover, setProfile, profile, cover])

  // const handleClick = async (e) =>{
  //   e.preventDefault();
  //   console.log(cover);
  //   console.log(profile);
  //   console.log(password.current.value);
  //   console.log(passwordAgain.current.value);
  //    if(password.current.value !== passwordAgain.current.value){
  //     alert("Password didn't match")
  //     passwordAgain.current.setCustomValidity("password don't match")
  //    }else{
  //     console.log(cover);
  //     console.log(profile);
  //     const user = {
  //       username: username.current.value,
  //       email: email.current.value,
  //       password: password.current.value,
  //       ProfilePicture: profile,
  //       CoverPicture: cover,
  //     };
  //     try {
  //       await axios.post("/auth/register", user);
  //       navigate("/login");
  //     } catch (error) {
  //       alert("wrong email or password");
  //       console.log(error);
  //     }

  //    }
     
  // }

  // useEffect(() => {
  //    console.log(file1);
  //     setFile1(file1);
  // }, [setFile1]);

  // useEffect(() => {
  //    console.log(file2);
  //     setFile2(file2);
  // }, [setFile2]);

  // useEffect(()=>{
  //   setProfile(profile);
  //   console.log(profile);
  // }, [setProfile, profile]);

  // useEffect(()=>{
  //   setCover(cover);
  //   console.log(cover);
  // }, [setCover, cover]);

  

  return (
<div className="login">
  <div className="loginWrapper">
    <div className="loginLeft">
      <h3 className="loginLogo">Social</h3>
      <span className="loginDesc">
        Connect with friends and the world around you on Social.
        😊
      </span>
    </div>
    <div className="loginRight">
      <form className="loginBox" onSubmit={handleSumbit} >
        
        <input placeholder="Username"
          className="loginInput"
          ref={username}
          required

          />
        
       
        <input placeholder="Email"
          className="loginInput"
          type="email"
          ref={email}
          required
          />
        
        <input placeholder="Password"
          className="loginInput"
          required
          type="password"
          ref={password}
          />
        
        <input placeholder="Password Again"
          className="loginInput"
          required
          type="password"
          ref={passwordAgain}
          />

        <div className="fileContainer">
          <div className="file1">
            <span className='shareOptionText' >Chose Profile Picture</span>
            <input type="file" id="file1" accept='.png,.jpeg,.jpg' onChange={(e) =>setFile1(e.target.files[0])}  />  
          </div>
          <div className="file2">
            <span className='shareOptionText' >Chose Crofile Picture</span>
            <input type="file" id="file2" accept='.png,.jpeg,.jpg' onChange={(e) =>setFile2(e.target.files[0])}  />  
          </div>
        </div>
        <button className="loginButton" 
        >Sign Up</button>


        <Link to="/login"  >
        <button className="loginRegisterButton">
          Log into Account
        </button>
        </Link>
      </form>
    </div>
  </div>
</div>
  )
}

export default Register
