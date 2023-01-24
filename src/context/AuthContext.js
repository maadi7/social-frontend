import {createContext, useReducer, useEffect} from "react"; 
import AuthReducer from "./AuthReducer";
import { useState } from "react";

export const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    errror: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user]);
      const [currentChat, setCurrentChat] = useState(null);
 
    return(
        <AuthContext.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            errror: state.errror,
            dispatch,
            currentChat,
            setCurrentChat
        }}
        >
           {children}
        </AuthContext.Provider>
    )
} 