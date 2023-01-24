import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate

} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";


function App() {
  const {user:currentUser} = useContext(AuthContext);
  

  return (
    <>
    <Router>

     <Routes>
     
     <Route path="/messenger" element={!currentUser? <Register/>:<Messenger/>} />

      <Route path="/" element={currentUser ? <Home/>: <Register/>} />

      <Route path="/profile/:username" element={<Profile/>} />

      <Route path="/login" element={currentUser ? <Navigate to="/"/>: <Login/>} />

      <Route path="/register" element={currentUser ? <Navigate to="/"/> : <Register/>} />
  
  
     </Routes>

    </Router>
  
    </>
  );
}

export default App;
