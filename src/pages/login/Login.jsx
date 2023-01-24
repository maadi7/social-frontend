import {useRef} from 'react';
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    const email = useRef();
    const password = useRef();
    const{user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = (e) =>{

       e.preventDefault();
       loginCall({email: email.current.value,
        password: password.current.value }, dispatch);
    }
    
    return (
    <div className='login'>
    <div className="loginWrapper">
    <div className="loginLeft">
        <span className='loginLogo'>Social</span>
        <span className="loginText">  Connect with friends and the world around you on Social. 😊</span>
    </div>
    <div className="loginRight">
    <form className="loginBox" onSubmit={handleClick} >
    <input placeholder="Email" 
    type="email"
    required 
    ref={email}
    className="loginInput" />

    <input
     placeholder="Password" 
     type="password"
     minLength="6"
     required
     ref={password}
      className="loginInput" />

    <button className="loginButton">Log In</button>
    
    <Link to="/register" >
    <button className="loginRegisterButton">
        Create a New Account
    </button>
    </Link>
    </form>
     </div>
    </div>
    </div>
    )
}

export default Login
